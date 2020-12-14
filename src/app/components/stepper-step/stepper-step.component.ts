import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'stepper-step',
  templateUrl: './stepper-step.component.html',
  styleUrls: ['./stepper-step.component.scss']
})
export class StepperStepComponent implements OnInit {

  @Input() isOptional: boolean = false;
  @Input() label: string;
  @Input() form: FormGroup;
  @ViewChild('template') template: TemplateRef<any>;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  submit(): void {
    this.formSubmitted.emit();
  }

}
