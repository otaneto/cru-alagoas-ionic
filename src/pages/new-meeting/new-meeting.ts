import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import leaflet from 'leaflet';
import { truncate } from 'lodash';

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
  place: any;
  @ViewChild('map') mapContainer: ElementRef;

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
      place_description: ['', Validators.required],
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
          location: data.place
        });
        this.center = [data.place.lat, data.place.lon];
        this.place = data.place;
      }
      this.loadMap();
    });
  }

  truncate(string) {
    return truncate(string, { length: 80, omission: '...' });
  }

  loadMap() {
    this.myMap = leaflet.map('map').setView(this.center, 15);

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
