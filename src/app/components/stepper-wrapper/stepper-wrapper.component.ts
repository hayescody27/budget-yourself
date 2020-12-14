import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, ContentChildren, Input, OnInit, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Subscription } from 'rxjs';
import { StepperStepComponent } from '../stepper-step/stepper-step.component';

@Component({
  selector: 'stepper-wrapper',
  templateUrl: './stepper-wrapper.component.html',
  styleUrls: ['./stepper-wrapper.component.scss']
})
export class StepperWrapperComponent implements OnInit {

  public selectedIndex: number = 0;
  public isMobile: boolean;
  public template: TemplateRef<any>;
  @Input() isLinear: boolean = true;
  @Input() startAtIndex: number;
  @ContentChildren(StepperStepComponent) private steps: QueryList<StepperStepComponent>;
  @ViewChild('horizontal') templHorizontal: TemplateRef<any>;
  @ViewChild('vertical') templVertical: TemplateRef<any>;
  @ViewChild('stepper') stepper: MatStepper;

  private _bpSub: Subscription

  constructor(private bpObserver: BreakpointObserver) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this._bpSub = this.bpObserver
      .observe(['(max-width: 599px)'])
      .subscribe((state: BreakpointState) => {
        this.setMobileStepper(state.matches);
      });

    if (this.startAtIndex) {
      this.selectedIndex = this.startAtIndex;
    }
  }

  selectionChanged(event: any): void {
    this.selectedIndex = event.selectedIndex;
  }

  setMobileStepper(isMobile: boolean): void {
    this.isMobile = isMobile;
    if (isMobile) {
      this.template = this.templVertical;
    }
    else {
      this.template = this.templHorizontal;
    }
    setTimeout(() => {
      this.stepper.selectedIndex = this.selectedIndex;
    });
  }

  reset(): void {
    this.stepper.reset();
  }

  ngOnDestroy(): void {
    this._bpSub.unsubscribe();
  }

}
