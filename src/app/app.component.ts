import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  isAuthenticated: boolean;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    const config = {
      apiKey: "AIzaSyCJTj7OXR9ewE8t8zDsTGstIfPw3rUhwqo",
      authDomain: "app-cru-alagoas.firebaseapp.com",
      databaseURL: "https://app-cru-alagoas.firebaseio.com",
      projectId: "app-cru-alagoas",
      storageBucket: "app-cru-alagoas.appspot.com",
      messagingSenderId: "393446787429"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.isAuthenticated = true;
        this.nav.setRoot(TabsPage);
      } else {
        this.isAuthenticated = false;
        this.nav.setRoot(LoginPage);
      }
    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
