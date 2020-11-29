import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetWizardComponent } from './budget-wizard.component';

describe('BudgetWizardComponent', () => {
  let component: BudgetWizardComponent;
  let fixture: ComponentFixture<BudgetWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetWizardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
