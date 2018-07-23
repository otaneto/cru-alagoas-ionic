import { ShowMeetingPage } from './../show-meeting/show-meeting';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController,
  ModalController
} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { truncate } from 'lodash';
import leaflet from 'leaflet';

import { MeetingsService } from '../meetings/meetings.service';
import { SelectLocationPage } from '../select-location/select-location';

@IonicPage()
@Component({
  selector: 'page-edit-meeting',
  templateUrl: 'edit-meeting.html'
})
export class EditMeetingPage implements OnInit {
  meeting: any;
  meetingForm: FormGroup;
  days: any[] = [];
  time: any;
  myMap: any;
  center: leaflet.PointTuple;
  marker: any;
  place: any;
  photo: any = 'https://hlfppt.org/wp-content/uploads/2017/04/placeholder.png';
  @ViewChild('edit-map') mapContainer: ElementRef;

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
    this.meeting = this.navParams.data.meeting;
    this.center = [this.meeting.location.lat, this.meeting.location.lon];
    this.initMeetingForm();
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
      id: [this.meeting.id, Validators.required],
      name: [this.meeting.name, Validators.required],
      location: [this.meeting.location, Validators.required],
      days: [this.meeting.days, Validators.required],
      time: [this.meeting.time, Validators.required],
      description: [this.meeting.description, Validators.required],
      type: [this.meeting.type, Validators.required],
      leaders: [this.meeting.leaders, Validators.required],
      place_description: [this.meeting.place_description, Validators.required],
      picture: [this.meeting.picture || '']
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
    this.myMap = leaflet.map('edit-map').setView(this.center, 15);

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
      this.updateMeeting(this.meeting.id);
      if (this.meetingForm.get('picture').value.length > 0) {
        this.uploadImage(this.meeting.id);
      }
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
        const alert = this.alertCtrl.create({
          title: 'Erro ao carregar imagem',
          message:
            err.message ||
            'A reunião foi editada, porém a imagem de capa não foi carregada',
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  updateMeeting(id) {
    if (this.meetingForm.valid) {
      const body = { ...this.meetingForm.value };
      this.meetingsService
        .updateMeeting(body)
        .then(data => {
          console.log(data);
          this.myMap.remove();
          this.navCtrl.setRoot(ShowMeetingPage, {
            meeting: body
          });
        })
        .catch(err => {
          const alert = this.alertCtrl.create({
            title: 'Erro ao atualizar Reunião',
            message: err.message || 'Tente novamente mais tarde',
            buttons: ['Ok']
          });
          alert.present();
        });
    }
  }

  load() {
    return this.loadCtrl.create({
      content: 'Carregando...'
    });
  }

  ionViewWillLeave() {
    this.myMap.remove();
  }
}
