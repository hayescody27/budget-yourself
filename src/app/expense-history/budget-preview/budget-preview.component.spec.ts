import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetPreviewComponent } from './budget-preview.component';

describe('BudgetPreviewComponent', () => {
  let component: BudgetPreviewComponent;
  let fixture: ComponentFixture<BudgetPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
