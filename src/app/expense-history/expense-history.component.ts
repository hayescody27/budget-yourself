import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Budget } from '../models/budget';
import { ExpenseItem } from '../models/expense-item';
import { User } from '../models/user';
import { LoginService } from '../services/auth/login-service.service';

@Component({
  selector: 'expense-history',
  templateUrl: './expense-history.component.html',
  styleUrls: ['./expense-history.component.scss']
})
export class ExpenseHistoryComponent implements OnInit {

  mode: string = 'budgetSelect'
  user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  budgetSelection: FormGroup;
  currentBudget: Budget = null;
  budgets: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private auth: LoginService, private db: AngularFirestore, private fb: FormBuilder, private sb: MatSnackBar) {
    this.auth.user$.pipe(
      tap(user => {
        this.user.next(user);
        this.db.collection(`users/${user.uid}/budgets`).valueChanges({ idField: 'id' }).subscribe(b => {
          this.budgets.next(b);
        })
      })
    ).subscribe();

  }

  ngOnInit(): void {
    this.budgetSelection = this.fb.group({
      budget: ['', Validators.required]
    })
  }

  loadBudget(budget) {
    if (budget) {
      this.currentBudget = budget;
      this.mode = 'expenseTracking';
    }
  }

  updateExpenseHistory(event, index) {
    this.currentBudget.budgetItems[index].expenseItems = event;
    const budgetRef = this.db.doc(`users/${this.user.getValue().uid}/budgets/${this.currentBudget.id}`);
    budgetRef.set(this.currentBudget);
    this.sb.open('Successfully updated!', '', { verticalPosition: "top", duration: 1000 })
  }

  budgetDeleted() {
    setTimeout(() => {
      this.mode = 'budgetSelect';
    }, 500);
  }

}
