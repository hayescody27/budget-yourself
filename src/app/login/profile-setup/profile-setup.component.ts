import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/auth/login-service.service';

@Component({
  selector: 'profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.scss']
})
export class ProfileSetupComponent implements OnInit {

  profileSetup: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private db: AngularFirestore, private auth: LoginService) {

  }

  ngOnInit(): void {
    this.profileSetup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    })
  }

  completeProfileSetup() {
    this.auth.user$.pipe(
      take(1)
    ).subscribe(x => {
      console.log('take 1');
      const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${x.uid}`);
      userRef.update(<User>{ firstName: this.profileSetup.get('firstName').value, lastName: this.profileSetup.get('lastName').value });
    });

  }



}
