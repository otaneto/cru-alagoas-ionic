import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  IonicPage,
  ViewController,
  AlertController,
  LoadingController
} from 'ionic-angular';
import leaflet from 'leaflet';

import { LocationService } from './location.service';

@IonicPage()
@Component({
  selector: 'page-select-location',
  templateUrl: 'select-location.html'
})
export class SelectLocationPage {
  placesFound: any;
  myMap: any;
  center: leaflet.PointTuple;
  marker: any;
  place: any;
  @ViewChild('select-map') mapContainer: ElementRef;

  constructor(
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public viewCtrl: ViewController,
    private locationService: LocationService
  ) {}

  ionViewDidEnter() {
    this.center = ['-9.6475', '-35.7337'];
    this.loadMap();
  }

  loadMap() {
    this.myMap = leaflet.map('select-map').setView(this.center, 13);

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

  searchPlace(event) {
    const loading = this.loadCtrl.create({
      content: 'Buscando...'
    });
    loading.present();

    const query = event.target.value;
    this.locationService.getLocation(query).subscribe(
      data => {
        loading.dismiss();
        this.placesFound = data;
      },
      err => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Erro ao cadastrar',
          message: err.message,
          buttons: ['Ok']
        });
        alert.present();
      }
    );
  }

  selectPlace(place) {
    this.place = place;
    leaflet.layerGroup().addTo(this.myMap);
    this.center = [place.lat, place.lon];
    this.myMap.setView(this.center, 15);
    this.markPlace();
  }

  confirmPlace() {
    this.viewCtrl.dismiss({ place: this.place });
    this.myMap.remove();
  }

  abort() {
    this.viewCtrl.dismiss();
    this.myMap.remove();
  }
}
