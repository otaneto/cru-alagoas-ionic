import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { NominatimJS } from 'nominatim-js';
import leaflet from 'leaflet';

@IonicPage()
@Component({
  selector: 'page-select-location',
  templateUrl: 'select-location.html'
})
export class SelectLocationPage {
  placesFound: any[];
  myMap: any;
  center: leaflet.PointTuple;
  marker: any;
  place: any;
  @ViewChild('map-select') mapContainer: ElementRef;

  constructor(public viewCtrl: ViewController) {}

  ionViewDidEnter() {
    this.center = ['-9.6475', '-35.7337'];
    this.loadMap();
  }

  loadMap() {
    this.myMap = leaflet.map('selecet-map').setView(this.center, 13);

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
    NominatimJS.search({
      q: event.target.value
    })
      .then(data => {
        this.placesFound = data;
      })
      .catch(error => console.log(error));
  }

  selectPlace(place) {
    this.place = place;
    leaflet.layerGroup().addTo(this.myMap);
    this.center = [place.lat, place.lon];
    this.myMap.setView(this.center, 15);
    this.markPlace();
  }

  confirmPlace() {
    this.viewCtrl.dismiss({ location: this.place });
    this.myMap.remove();
  }

  abort() {
    this.viewCtrl.dismiss();
    this.myMap.remove();
  }
}
