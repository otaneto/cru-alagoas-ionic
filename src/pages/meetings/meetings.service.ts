import { omit } from 'lodash';
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
    const body = omit(data, ['picture']);
    return firebase
      .database()
      .ref(`meetings`)
      .push(body);
  }

  updateMeeting(data) {
    const body = {};
    body[data.id] = data;
    return firebase
      .database()
      .ref('meetings')
      .update(body);
  }

  uploadMeetingImage(data) {
    return firebase
      .storage()
      .ref(`meetings/${data.id}.jpeg`)
      .putString(data.picture.substring(23), 'data_url', {
        contentType: 'image/jpg'
      });
  }

  deleteMeeting(data) {
    return firebase
      .database()
      .ref('meetings')
      .child(data.id)
      .remove();
  }
}
