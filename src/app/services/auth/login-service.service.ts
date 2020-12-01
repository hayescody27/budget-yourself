import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { FirebaseApp } from '@angular/fire';
import firebase from 'firebase';
import { Budget } from 'src/app/models/budget';
import { BudgetItem } from 'src/app/models/budget-item';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user$: Observable<any>

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router, private s: FirebaseApp) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }


  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const cred = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(cred.user);
  }

  async emailSignIn({ email, password }) {
    const cred = await this.afAuth.createUserWithEmailAndPassword(email, password);
    return this.updateUserData(cred.user);
  }

  async signOut() {
    await this.afAuth.signOut();
  }

  updateUserData(user: firebase.User): Promise<void> {
    debugger;
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);
    let userData: User = <User>{};
    userData.uid = user.uid;
    userData.email = user.email;
    userData.budgets = <Budget[]>[<Budget>{budgetName: '', budgetStatus: 0, budgetItems:[<BudgetItem>{description: '', amount: 0}]}];
    userData.firstName = "Pending...";
    userData.lastName = "Pending...";
    return userRef.set(userData, { merge: true });
  }
}
