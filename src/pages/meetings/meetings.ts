import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShowMeetingPage } from '../show-meeting/show-meeting';

@Component({
  selector: 'page-meetings',
  templateUrl: 'meetings.html'
})
export class MeetingsPage {
  meetings: any[];
  meetingsFound: any[];
  constructor(public navCtrl: NavController) {}

  ngOnInit() {
    this.initMeetingsArray();
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
