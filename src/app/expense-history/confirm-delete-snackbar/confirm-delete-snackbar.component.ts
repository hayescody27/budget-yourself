import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'confirm-delete-snackbar',
  templateUrl: './confirm-delete-snackbar.component.html',
  styleUrls: ['./confirm-delete-snackbar.component.scss']
})
export class ConfirmDeleteSnackbarComponent implements OnInit {



  constructor(public snackBarRef: MatSnackBarRef<ConfirmDeleteSnackbarComponent>) { }

  ngOnInit(): void {
  }

  confirmDelete() {
    this.snackBarRef.dismissWithAction();
  }

  cancel() {
    this.snackBarRef.dismiss();
  }

}
