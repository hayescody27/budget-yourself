import { Component, Input, OnInit } from '@angular/core';
import { Budget } from 'src/app/models/budget';

@Component({
  selector: 'budget-preview',
  templateUrl: './budget-preview.component.html',
  styleUrls: ['./budget-preview.component.scss']
})
export class BudgetPreviewComponent implements OnInit {

  @Input()
  budget: Budget = null;

  constructor() { }

  ngOnInit(): void {
  }

}
