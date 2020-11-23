import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseRowContainerComponent } from './expense-row-container.component';

describe('ExpenseRowContainerComponent', () => {
  let component: ExpenseRowContainerComponent;
  let fixture: ComponentFixture<ExpenseRowContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseRowContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseRowContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
