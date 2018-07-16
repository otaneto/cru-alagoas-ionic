import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { indexOf } from 'lodash';

import { ShowMeetingPage } from '../show-meeting/show-meeting';
import { UserService } from '../../services/user.service';
import { NewMeetingPage } from '../new-meeting/new-meeting';

@Component({
  selector: 'page-meetings',
  templateUrl: 'meetings.html'
})
export class MeetingsPage {
  user: any;
  isAdmin: boolean = false;
  meetings: any[];
  meetingsFound: any[];
  constructor(
    public navCtrl: NavController,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.initMeetingsArray();
    this.getUser();
  }

  getUser() {
    const authenticatedUser = this.userService.getAuthenticatedUser();

    this.userService.getUserInfo(authenticatedUser.uid).then(data => {
      this.user = data.val();
      this.isAdmin = indexOf(this.user.roles, 'admin') !== -1;
    });
  }

  goToNewMeetingPage() {
    this.navCtrl.push(NewMeetingPage);
  }

  initMeetingsArray() {
    this.meetings = [
      { name: 'Discipulado UFAL' },
      { name: 'Reunião Unit' },
      { name: 'Reunião UFAL' },
      { name: 'Reunião IFAL' }
    ];

    this.meetingsFound = this.meetings;
  }

  getMeetings(event: any) {
    const value = event.target.value;

    const expression = new RegExp(value, 'i');
    this.meetingsFound = this.meetings.filter(item =>
      expression.test(item.name)
    );
  }

  showMeeting(meeting: any) {
    this.navCtrl.push(ShowMeetingPage, { ...meeting });
  }
}
