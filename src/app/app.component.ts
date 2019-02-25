import {Component} from '@angular/core';
import * as firebase from 'firebase';
import {FirebaseAuthService} from './services/firebase-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private firebaseAuth: FirebaseAuthService) {
    const config = firebaseAuth.getAuthData();

    firebase.initializeApp(config);
  }
}
