import { Component, OnInit } from '@angular/core';
import {
  NavController,
  LoadingController,
  AlertController
} from 'ionic-angular';
import { indexOf, values, truncate, orderBy } from 'lodash';

import { ShowMeetingPage } from '../show-meeting/show-meeting';
import { UserService } from '../../services/user.service';
import { NewMeetingPage } from '../new-meeting/new-meeting';
import { MeetingsService } from './meetings.service';

@Component({
  selector: 'page-meetings',
  templateUrl: 'meetings.html'
})
export class MeetingsPage implements OnInit {
  user: any;
  isAdmin: boolean = false;
  meetings: any[];
  meetingsFound: any[];
  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private userService: UserService,
    private meetingsService: MeetingsService
  ) {}

  ngOnInit() {
    this.getMeetings();
    this.getUser();
  }

  getUser() {
    const authenticatedUser = this.userService.getAuthenticatedUser();
    this.userService
      .getUserInfo(authenticatedUser.uid)
      .then(data => {
        this.user = data.val();
        this.isAdmin = indexOf(this.user.roles, 'admin') !== -1;
      })
      .catch(err => {
        const alert = this.alertCtrl.create({
          title: 'Erro ao buscar usuários',
          message: err.message || 'Tente novamente mais tarde',
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  getMeetings() {
    const loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();
    this.meetingsService
      .getMeetings()
      .then(data => {
        loading.dismissAll();
        this.meetings = values(data.val());
        this.meetings = orderBy(this.meetings, ['name']);
        this.meetingsFound = this.meetings;
      })
      .catch(err => {
        loading.dismissAll();
        const alert = this.alertCtrl.create({
          title: 'Erro ao buscar reuniões',
          message: err.message || 'Tente novamente mais tarde',
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  goToNewMeetingPage() {
    this.navCtrl.push(NewMeetingPage);
  }

  serachMeetings(event: any) {
    const value = event.target.value;

    const expression = new RegExp(value, 'i');
    this.meetingsFound = this.meetings.filter(item =>
      expression.test(item.name)
    );
    this.meetingsFound = orderBy(this.meetingsFound, ['name']);
  }

  concatDays(days) {
    const daysString = days.reduce((init, item) => {
      if (days.length > 1) {
        return item + ', ';
      } else {
        return item;
      }
    }, '');

    return daysString;
  }

  showMeeting(meeting: any) {
    this.navCtrl.push(ShowMeetingPage, { ...meeting });
  }

  truncate(string) {
    return truncate(string, { length: 80, omission: '...' });
  }
}
