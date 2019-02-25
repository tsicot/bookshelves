import {Component} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const config = {
      apiKey: 'AIzaSyB5to5lbCbIXEVWqIIsV-vTDXPRPDDNGqc',
      authDomain: 'bookshelves-fdea2.firebaseapp.com',
      databaseURL: 'https://bookshelves-fdea2.firebaseio.com',
      projectId: 'bookshelves-fdea2',
      storageBucket: 'bookshelves-fdea2.appspot.com',
      messagingSenderId: '108673099194'
    };
    firebase.initializeApp(config);
  }
}
