import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Budget } from 'src/app/models/budget';
import { User } from 'src/app/models/user';
import { ConfirmDeleteSnackbarComponent } from '../confirm-delete-snackbar/confirm-delete-snackbar.component';

@Component({
  selector: 'budget-preview',
  templateUrl: './budget-preview.component.html',
  styleUrls: ['./budget-preview.component.scss']
})
export class BudgetPreviewComponent implements OnInit {

  @Input()
  budget = null;
  @Input()
  user: User = null;
  @Output()
  budgetSelected = new EventEmitter();

  constructor(private db: AngularFirestore, private sb: MatSnackBar) {

  }

  ngOnInit(): void {
  }

  deleteBudget(confirm?: boolean) {
    const budgetRef = this.db.doc(`users/${this.user.uid}/budgets/${this.budget.id}`);
    if (confirm == null) {
      let snackbarRef = this.sb.openFromComponent(ConfirmDeleteSnackbarComponent, { verticalPosition: 'top' });
      snackbarRef.onAction().subscribe(() => { this.deleteBudget(true) });
    }
    if (confirm) {
      budgetRef.delete();
    }
  }

}
