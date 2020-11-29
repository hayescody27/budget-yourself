import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'expense-row',
  templateUrl: './expense-row.component.html',
  styleUrls: ['./expense-row.component.scss']
})
export class ExpenseRowComponent implements OnInit {

  expenseTypeControl = new FormControl('', Validators.required);
  expenseTypes: any[] = ['Example 1', 'Example 2', 'Example 3'];

  constructor() { }

  ngOnInit(): void {

  }

}
