import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/auth/login-service.service';
import { BudgetStep } from '../budget-steps.enum';
import firestore from 'firebase';
import { Budget } from 'src/app/models/budget';

@Component({
  selector: 'budget-wizard',
  templateUrl: './budget-wizard.component.html',
  styleUrls: ['./budget-wizard.component.scss']
})
export class BudgetWizardComponent implements OnInit {

  wizardStep: BudgetStep = BudgetStep.MonthlyIncome;
  budgetNameGroup: FormGroup;
  monthlyIncomeGroup: FormGroup;
  addItemsGroup: FormGroup;
  remainingBudget = new Subject<number>();
  remainingBudgetStyle;

  reviewColumns: string[] = ['description', 'amount'];
  reviewDataSource = [];

  constructor(private fb: FormBuilder, private sb: MatSnackBar, private db: AngularFirestore, private auth: LoginService) {
    this.remainingBudget.subscribe(rem => {
      if (rem < 0) {
        this.remainingBudgetStyle = { 'color': 'red' };
      } else {
        this.remainingBudgetStyle = {};
      }
    })
  }

  ngOnInit(): void {
    this.budgetNameGroup = this.fb.group({
      budgetName: ['', Validators.required]
    })
    this.monthlyIncomeGroup = this.fb.group({
      monthlyIncome: ['', Validators.required]
    });
    this.addItemsGroup = this.fb.group({
      addItemRows: this.fb.array([])
    })
    this.addItemRows.valueChanges.subscribe((value: any[]) => {
      this.remainingBudget.next(this.monthlyIncomeGroup.value.monthlyIncome - value.map(x => x.amount).reduce((a, b) => a + b, 0));
      this.reviewDataSource = value;
    });
    this.monthlyIncomeGroup.controls['monthlyIncome'].valueChanges.subscribe(monthlyIncome => {
      this.remainingBudget.next(monthlyIncome - this.addItemRows.value.map(x => x.amount).reduce((a, b) => a + b, 0));
    })
  }

  ngAfterViewInit(): void {
    for (let i = 0; i < 5; i++) {
      this.addBudgetRow(i - 1);
    }

  }

  get addItemRows() {
    return this.addItemsGroup.get('addItemRows') as FormArray;
  }

  addBudgetRow(i) {
    let row = this.fb.group({ description: ['', Validators.required], amount: [0, [Validators.required, Validators.min(0)]] });
    this.addItemRows.insert(i + 1, row);
  }

  deleteBudgetRow(i) {
    if (this.addItemRows.length == 1) {
      this.sb.open('You must have at least one budget item!', '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
      return;
    }
    this.addItemRows.removeAt(i);
  }

  resetBudgetRows() {
    this.addItemRows.clear();
    this.addBudgetRow(1);
    this.monthlyIncomeGroup.controls
  }

  submitNewBudget() {

    let budget: Budget = <Budget>{
      budgetAmount: this.monthlyIncome,
      budgetItems: this.budgetItems,
      budgetName: this.budgetName,
      budgetStatus: 1
    }

    this.auth.user$.pipe(
      take(1)
    ).subscribe(x => {
      const userRef = this.db.doc(`users/${x.uid}`).collection('budgets');
      userRef.add(budget);
    });
    this.sb.open('Budget Created!', '', { duration: 1000, verticalPosition: 'top' });
  }

  get budgetName() {
    return this.budgetNameGroup.get('budgetName').value;
  }

  get monthlyIncome() {
    return this.monthlyIncomeGroup.get('monthlyIncome').value;
  }

  get budgetItems() {
    return this.addItemsGroup.get('addItemRows').value;
  }

}
