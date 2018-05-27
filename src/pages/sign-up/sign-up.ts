import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TabsPage } from '../tabs/tabs';
import { AuthenticationService } from '../../services/authentication.service';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  signUpForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fb: FormBuilder,
              private _authService: AuthenticationService) {}

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.signUpForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      confirm_password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    })
  }

  confirmPasswordIsEqualPassword() {
      return this.signUpForm.get('confirm_password').value === this.signUpForm.get('password').value;
  }

  signUp() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    if (this.signUpForm.valid) {
      this._authService.signUp(email, password)
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }
  }

}
