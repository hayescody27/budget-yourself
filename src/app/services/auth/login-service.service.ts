import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, pipe } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { FirebaseApp } from '@angular/fire';
import firebase from 'firebase';
import { Budget } from 'src/app/models/budget';
import { BudgetItem } from 'src/app/models/budget-item';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user$: Observable<any>;
  loggedIn$: Observable<boolean>;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router, private s: FirebaseApp) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          let ret = this.db.doc(`users/${user.uid}`).valueChanges();
          return ret;
        } else {
          return of(null);
        }
      })
    )
    this.loggedIn$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return of(true);
        } else {
          return of(false);
        }
      })
    )
  }

  async emailSignUp({ email, password }) {
    try {
      const cred = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.initUser(cred.user);
    } catch (error) {
      alert(error);
    }
  }

  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const cred = await this.afAuth.signInWithPopup(provider);
      this.initUser(cred.user);
    } catch (error) {
      alert(error);
    }

  }

  async emailSignIn({ email, password }) {
    try {
      const cred = await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  }

  async signOut() {
    this.router.navigate(['']);
    await this.afAuth.signOut();
  }

  initUser(user: firebase.User) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);
    console.log(userRef);
    userRef.snapshotChanges().subscribe(s => {
      if (!s.payload.exists) {
        userRef.set(<User>{ uid: user.uid, email: user.email });
      }
    })
  }

}
