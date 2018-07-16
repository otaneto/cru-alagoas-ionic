import firebase from 'firebase';
import { Injectable } from '@angular/core';
@Injectable()
export class MeetingsService {
  constructor() {}

  getMeetings() {
    return firebase
      .database()
      .ref('meetings')
      .once('value');
  }

  getMeetingInfo(id) {
    return firebase
      .database()
      .ref('meetings')
      .child(id)
      .once('value');
  }

  createMeeting(data) {
    const user = { ...data, roles: ['user'] };

    return firebase
      .database()
      .ref(`meetings/${data.id}`)
      .update(user);
  }

  updateMeeting(data) {
    return firebase
      .database()
      .ref(`meetings/${data.id}`)
      .update(data);
  }
}
