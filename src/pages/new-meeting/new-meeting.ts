import { Component, OnInit } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import leaflet from 'leaflet';

import { SelectLocationPage } from '../select-location/select-location';

@IonicPage()
@Component({
  selector: 'page-new-meeting',
  templateUrl: 'new-meeting.html'
})
export class NewMeetingPage implements OnInit {
  meetingForm: FormGroup;
  days: any[] = [];
  time: any;
  myMap: any;
  center: leaflet.PointTuple;
  marker: any;

  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initMeetingForm();
    this.center = ['-9.6475', '-35.7337'];
    this.loadMap();
  }

  initMeetingForm() {
    this.meetingForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      days: [[''], Validators.required],
      time: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      leaders: ['', Validators.required],
      picture: ['', Validators.required]
    });
  }

  selectDays(days) {
    this.meetingForm.patchValue({
      days
    });
  }

  selectTime(time) {
    if (this.meetingForm) {
      this.meetingForm.patchValue({
        time
      });
    }
  }

  onOpenMap() {
    this.myMap.remove();
    const modal = this.modalCtrl.create(SelectLocationPage);
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.meetingForm.patchValue({
          location: data.location
        });
        this.center = data.location;
        this.loadMap();
      }
    });
  }

  loadMap() {
    this.myMap = leaflet.map('map').setView(this.center, 13);

    leaflet
      .tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 17
      })
      .addTo(this.myMap);

    this.markPlace();

    // marker.bindPopup('<p> Leaflet Mapa Funcionando. </p>');
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
