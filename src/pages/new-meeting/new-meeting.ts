import { MeetingsService } from './../meetings/meetings.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  AlertController,
  LoadingController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import leaflet from 'leaflet';
import { truncate } from 'lodash';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { SelectLocationPage } from '../select-location/select-location';
import { MeetingsPage } from '../meetings/meetings';

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
  photo: any = 'https://hlfppt.org/wp-content/uploads/2017/04/placeholder.png';
  @ViewChild('map') mapContainer: ElementRef;

  constructor(
    public alertCtrl: AlertController,
    private camera: Camera,
    private fb: FormBuilder,
    public loadCtrl: LoadingController,
    private meetingsService: MeetingsService,
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ngOnInit() {
    this.initMeetingForm();
    this.center = ['-9.6475', '-35.7337'];
    this.loadMap();
  }

  getImage() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      quality: 100,
      correctOrientation: true,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.photo = 'data:image/jpeg;base64,' + imageData;
        this.meetingForm.patchValue({
          picture: this.photo
        });
      },
      err => {
        // Handle error
      }
    );
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
      picture: ['']
    });
  }

  selectDays(days) {
    this.meetingForm.patchValue({
      days
    });
  }

  selectTime({ hour, minute }) {
    if (this.meetingForm) {
      this.meetingForm.patchValue({
        time: `${hour}:${minute}`
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
  }

  markPlace() {
    if (this.marker) {
      this.myMap.removeLayer(this.marker);
    }
    this.marker = leaflet.marker(this.center);
    this.myMap.addLayer(this.marker);
  }

  submitMeeting() {
    this.load().present();
    if (this.meetingForm.valid) {
      const body = { ...this.meetingForm.value };
      this.meetingsService.createMeeting(body).then(data => {
        this.updateMeeting(data.key);
        this.myMap.remove();
        if (this.meetingForm.get('picture').valid) {
          this.uploadImage(data.key);
        } else {
          this.load().dismiss();
          const alert = this.alertCtrl.create({
            title: 'Erro ao criar a reunião',
            message: 'Tente novamente mais tarde',
            buttons: ['Ok']
          });
          alert.present();
          this.navCtrl.setRoot(MeetingsPage);
        }
      });
    }
  }

  uploadImage(id) {
    const picture = this.meetingForm.get('picture').value;
    this.meetingsService
      .uploadMeetingImage({ id, picture })
      .then(data => {
        // const picture_url = data.metadata.downloadURLs[0];
        console.log(data);
        // this.updateMeeting(id, picture_url);
      })
      .catch(err => {
        this.load().dismiss();
        const alert = this.alertCtrl.create({
          title: 'Erro ao carregar imagem',
          message:
            err.message ||
            'A reunião foi criada, porém a imagem de capa não foi carregada',
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  updateMeeting(id) {
    const body = { id, ...this.meetingForm.value };
    this.meetingsService
      .updateMeeting(body)
      .then(data => {
        this.load().dismiss();
        this.navCtrl.setRoot(MeetingsPage);
        this.myMap.remove();
      })
      .catch(err => {
        this.load().dismiss();
        const alert = this.alertCtrl.create({
          title: 'Erro ao atualizar Reunião',
          message: err.message || 'Tente novamente mais tarde',
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  load() {
    return this.loadCtrl.create({
      content: 'Carregando...'
    });
  }
}
