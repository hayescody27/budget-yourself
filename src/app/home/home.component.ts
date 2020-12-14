import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LoginService } from '../services/auth/login-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  fbCollection;

  constructor(private db: AngularFirestore, private auth: LoginService) {

    auth.user$.subscribe(x => {
      let ds = this.db.doc(`users/${x.uid}`).get().subscribe(x => {
        this.fbCollection = x.data();
      });
    })


  }

  ngOnInit(): void {
  }

  getReference() {
    this.auth.user$.subscribe(x => {
      const userRef = this.db.doc(`users/${x.uid}`);
    })
  }

}
