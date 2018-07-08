import firebase from 'firebase';
import { Injectable } from '@angular/core';
@Injectable()
export class UserService {
  constructor() {}

  createUser(data) {
    const user = { ...data, roles: ['user'] };

    return firebase
      .database()
      .ref('users')
      .push(user);
  }
}
