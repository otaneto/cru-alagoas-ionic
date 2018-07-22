import firebase from 'firebase';
import { Injectable } from '@angular/core';
import { omit } from 'lodash';
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
    const updates = {};
    updates[data.id] = omit(data, ['id']);
    console.log(updates);
    return firebase
      .database()
      .ref('users')
      .update(updates);
  }
}
