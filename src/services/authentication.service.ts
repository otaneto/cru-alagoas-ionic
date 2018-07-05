import firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthenticationService {
  constructor(private googlePlusService: GooglePlus) {}
  signUp(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }
  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  logout() {
    return firebase.auth().signOut();
  }
  loginWithGoogle() {
    return this.googlePlusService
      .login({
        webClientId:
          '393446787429-47se6q4qn6mh6oapfi2fn8cq9e2c4spu.apps.googleusercontent.com',
        offline: true
      })
      .then(res =>
        firebase
          .auth()
          .signInWithCredential(
            firebase.auth.GoogleAuthProvider.credential(res.idToken)
          )
      );
  }
}
