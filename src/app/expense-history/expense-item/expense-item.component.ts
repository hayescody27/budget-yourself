import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ExpenseItem } from 'src/app/models/expense-item';
import { LoginService } from 'src/app/services/auth/login-service.service';
import firebase from 'firebase';
import { BudgetItem } from 'src/app/models/budget-item';

@Component({
  selector: 'expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.scss']
})
export class ExpenseItemComponent implements OnInit {

  @Input() budgetItem: BudgetItem = null;
  @Output()
  onUpdateExpenseHistory = new EventEmitter();
  @ViewChild('scrollContainer', { static: false }) scrollContainer: ElementRef;
  scrollTop: number = null;
  expenseItemsForm: FormGroup;
  user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  remainingBudget: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  remainingBudgetStyle;

  constructor(private fb: FormBuilder, private sb: MatSnackBar) {

  }


  ngOnInit(): void {
    this.expenseItemsForm = this.fb.group({
      expenseItemFormArray: this.fb.array([])
    });
    this.expenseItemFormArray.valueChanges.subscribe((value: any) => {
      this.remainingBudget.next(this.budgetItem.amount - value.map(x => x.amount).reduce((a, b) => a + b, 0));
    });
    this.remainingBudget.subscribe(rem => {
      if (rem < 0) {
        this.remainingBudgetStyle = { 'color': '#f44336' };
      } else {
        this.remainingBudgetStyle = { 'color': '#5cb85c' };
      }
    })

    if (this.budgetItem.expenseItems && this.budgetItem.expenseItems.length > 0) {
      this.budgetItem.expenseItems.forEach(i => {
        this.addExpenseItemRow(i.description, i.amount);
      })
    } else {
      this.addExpenseItemRow();
    }
  }

  addExpenseItemRow(description?, amount?) {
    let item = this.fb.group({
      description: [description ? description : '', Validators.required],
      amount: [amount ? amount : null, [Validators.required, Validators.min(0)]]
    })
    this.expenseItemFormArray.push(item);
  }

  addExpenseItemRowAtIndex(i) {
    this.addExpenseItemRow();
    setTimeout(() => {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    });
  }

  deleteItemRow(i) {
    if (this.expenseItemFormArray.length == 1) {
      this.sb.open('You must have at least one expense item!', '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
      return;
    }
    this.expenseItemFormArray.removeAt(i);
    this.expenseItemsForm.markAsDirty();
  }

  updateExpenseHistory() {
    this.onUpdateExpenseHistory.emit(this.expenseItemFormArray.value);
    this.expenseItemsForm.markAsPristine();
  }

  get expenseItemFormArray() {
    return this.expenseItemsForm.get('expenseItemFormArray') as FormArray;
  }

}
