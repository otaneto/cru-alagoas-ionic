import firebase from 'firebase';

export class AuthenticationService {
    signUp(email: string, password: string) {
      return firebase.auth().createUserWithEmailAndPassword(email, password);
    }
    login(email: string, password: string) {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    }
    logout() {
      return firebase.auth().signOut();
    }
}