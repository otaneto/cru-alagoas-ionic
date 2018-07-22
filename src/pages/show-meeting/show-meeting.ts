import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { truncate } from 'lodash';
import leaflet from 'leaflet';

@IonicPage()
@Component({
  selector: 'page-show-meeting',
  templateUrl: 'show-meeting.html'
})
export class ShowMeetingPage {
  meeting: any;
  myMap: any;
  center: leaflet.PointTuple;
  marker: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit() {
    this.meeting = this.navParams.data;
    if (this.meeting) {
      this.center = [this.meeting.location.lat, this.meeting.location.lon];
      this.loadMap();
    }
  }

  truncate(string) {
    return truncate(string, { length: 80, omission: '...' });
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

  loadMap() {
    this.myMap = leaflet.map('map').setView(this.center, 15);

    leaflet
      .tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 17
      })
      .addTo(this.myMap);

    this.markPlace();
  }

  markPlace() {
    if (this.marker) {
      this.myMap.removeLayer(this.marker);
    }
    this.marker = leaflet.marker(this.center);
    this.myMap.addLayer(this.marker);
  }

  ionViewWillLeave() {
    this.myMap.remove();
  }
}
