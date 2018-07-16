import { Component, OnInit } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initMeetingForm();
  }

  initMeetingForm() {
    this.meetingForm = this.fb.group({
      name: ['', Validators.required],
      geolocation: ['', Validators.required],
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
    const modal = this.modalCtrl.create(SelectLocationPage);
    modal.present();
  }
}
