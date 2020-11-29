import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BudgetStep } from '../budget-steps.enum';

@Component({
  selector: 'budget-wizard',
  templateUrl: './budget-wizard.component.html',
  styleUrls: ['./budget-wizard.component.scss']
})
export class BudgetWizardComponent implements OnInit {

  wizardStep: BudgetStep = BudgetStep.MonthlyIncome;
  monthlyIncomeGroup: FormGroup;
  addItemsGroup: FormGroup;
  remainingBudget = new Subject<number>();
  remainingBudgetStyle;

  reviewColumns: string[] = ['description', 'amount'];
  reviewDataSource = [];

  constructor(private fb: FormBuilder, private sb: MatSnackBar) {
    this.remainingBudget.subscribe(rem => {
      if (rem < 0) {
        this.remainingBudgetStyle = {'color' : 'red'};
      } else {
        this.remainingBudgetStyle = {};
      }
    })
   }

  ngOnInit(): void {
    this.monthlyIncomeGroup = this.fb.group({
      monthlyIncomeControl: ['', Validators.required]
    });
    this.addItemsGroup = this.fb.group({
      addItemRows: this.fb.array([this.fb.group({description: ['', Validators.required], amount: [0, [Validators.required, Validators.min(0)]]})]) 
    })
    this.addItemRows.valueChanges.subscribe((value: any[]) => {
      this.remainingBudget.next(this.monthlyIncomeGroup.value.monthlyIncomeControl - value.map(x => x.amount).reduce((a, b) => a + b, 0));
      this.reviewDataSource = value;
      console.log(this.reviewDataSource)
    });
    this.monthlyIncomeGroup.controls['monthlyIncomeControl'].valueChanges.subscribe(monthlyIncome => {
      this.remainingBudget.next(monthlyIncome - this.addItemRows.value.map(x => x.amount).reduce((a, b) => a + b, 0));
    })
  }

  get addItemRows() {
    return this.addItemsGroup.get('addItemRows') as FormArray;
  }

  addBudgetRow() {
    let row = this.fb.group({description: ['', Validators.required], amount: [0, [Validators.required, Validators.min(0)]]});
    this.addItemRows.push(row);
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
    this.addBudgetRow();
    this.monthlyIncomeGroup.controls
  }

  submitNewBudget() {
    console.log(this.monthlyIncomeGroup.value);
    console.log(this.addItemsGroup.value);
  }

}
