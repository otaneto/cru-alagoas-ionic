import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

// import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    const config = {
      apiKey: "AIzaSyCJTj7OXR9ewE8t8zDsTGstIfPw3rUhwqo",
      authDomain: "app-cru-alagoas.firebaseapp.com",
      databaseURL: "https://app-cru-alagoas.firebaseio.com",
      projectId: "app-cru-alagoas",
      storageBucket: "app-cru-alagoas.appspot.com",
      messagingSenderId: "393446787429"
    };
    firebase.initializeApp(config);
  }
}
