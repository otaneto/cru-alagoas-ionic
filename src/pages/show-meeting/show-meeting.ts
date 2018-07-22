import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from 'ionic-angular';
import { truncate } from 'lodash';
import leaflet from 'leaflet';

import { MeetingsService } from './../meetings/meetings.service';
import { MeetingsPage } from '../meetings/meetings';

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

  constructor(
    public alertCtrl: AlertController,
    private meetingsService: MeetingsService,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

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
        return init + item + ', ';
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

  deleteMeeting() {
    const alert = this.alertCtrl.create({
      title: 'Tem certeza que deseja remover a reunião?',
      message: 'Esta ação não poderá ser desfeita',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: () => {
            this.onConfirmDelete();
          }
        }
      ]
    });
    alert.present();
  }

  onConfirmDelete() {
    this.meetingsService
      .deleteMeeting(this.meeting)
      .then(data => {
        this.onDeleteSuccess();
        this.navCtrl.setRoot(MeetingsPage);
      })
      .catch(err => this.onDeleteError(err));
  }

  onDeleteSuccess() {
    const alert = this.alertCtrl.create({
      title: 'Reunião excluída com sucesso',
      buttons: ['Ok']
    });
    alert.present();
  }

  onDeleteError(err) {
    const alert = this.alertCtrl.create({
      title: 'Não foi possível excluir reunião',
      message: err.message || 'Tente novamente mais tarde',
      buttons: ['Ok']
    });
    alert.present();
  }

  ionViewWillLeave() {
    this.myMap.remove();
  }
}
