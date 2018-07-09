import firebase from 'firebase';
import { Injectable } from '@angular/core';
@Injectable()
export class UserService {
  constructor() {}

  getAuthenticatedUser() {
    return firebase.auth().currentUser;
  }

  getUserInfo(id) {
    return firebase
      .database()
      .ref('users')
      .child(id)
      .once('value');
  }

  createUser(data) {
    const user = { ...data, roles: ['user'] };

    return firebase
      .database()
      .ref(`users/${data.id}`)
      .update(user);
  }

  updateUser(data) {
    return firebase
      .database()
      .ref(`users/${data.id}`)
      .update(data);
  }
}
