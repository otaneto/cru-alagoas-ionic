import { Component, OnInit } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { omit } from 'lodash';

import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage implements OnInit {
  signUpForm: FormGroup;
  birthday: string;

  constructor(
    private _authService: AuthenticationService,
    private alertCtrl: AlertController,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.signUpForm = this.fb.group({
      birthday: [''],
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      confirm_password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  confirmPasswordIsEqualPassword() {
    return (
      this.signUpForm.get('confirm_password').value ===
      this.signUpForm.get('password').value
    );
  }

  signUp() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    const loading = this.loadingCtrl.create({
      content: 'Cadastrando...'
    });

    loading.present();

    if (this.signUpForm.valid) {
      this._authService
        .signUp(email, password)
        .then(data => {
          this.createUser(data.user.uid, loading);
        })
        .catch(err => {
          loading.dismiss();
          const alert = this.alertCtrl.create({
            title: 'Erro ao cadastrar',
            message: err.message,
            buttons: ['Ok']
          });
          alert.present();
        });
    }
  }

  createUser(id, loading) {
    const user = {
      id,
      ...omit(this.signUpForm.value, ['password', 'confirm_password'])
    };

    this.userService.createUser(user);
    loading.dismiss();
    this.navCtrl.setRoot(TabsPage);
  }

  goToLoginPage() {
    this.navCtrl.setRoot(LoginPage);
  }
}
