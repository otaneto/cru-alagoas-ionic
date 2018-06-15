import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-show-meeting',
  templateUrl: 'show-meeting.html'
})
export class ShowMeetingPage {
  meeting: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit() {
    this.meeting = this.navParams.data;
  }
}
