import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShowMeetingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-meeting',
  templateUrl: 'show-meeting.html'
})
export class ShowMeetingPage {
  meeting: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit() {
    const { data } = this.navParams;
    this.meeting = data;
    console.log(this.meeting);
  }
}
