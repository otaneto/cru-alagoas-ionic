import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TabsPage } from '../tabs/tabs';
import { AuthenticationService } from '../../services/authentication.service';
import { SignUpPage } from '../sign-up/sign-up';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fb: FormBuilder,
              private _authService: AuthenticationService) {}

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.navCtrl.push(TabsPage);
    }
  }

  goToSignUpPage() {
    this.navCtrl.push(SignUpPage);
  }

}
