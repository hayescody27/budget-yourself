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

  constructor() {

  }

  ngOnInit(): void {
  }


}
