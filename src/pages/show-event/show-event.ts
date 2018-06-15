import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShowEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-event',
  templateUrl: 'show-event.html'
})
export class ShowEventPage {
  event: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit() {
    this.event = this.navParams.data;
  }
}
