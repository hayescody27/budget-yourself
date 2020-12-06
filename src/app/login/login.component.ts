import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/auth/login-service.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailSignIn: FormGroup;
  emailSignUp: FormGroup;

  constructor(private fb: FormBuilder, public auth: LoginService) {

  }

  ngOnInit(): void {
    this.emailSignIn = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
    this.emailSignUp = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, this.confirmPasswordValidator.bind(this)]]
    })
  }

  confirmPasswordValidator(fieldControl: FormControl) {
    if (this.emailSignUp) {
      return fieldControl.value === this.emailSignUp.get('password').value ? null : { error: 'Passwords do not match.' };
    }
  }

}
