import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TabsPage } from '../tabs/tabs';
import { AuthenticationService } from '../../services/authentication.service';
import { SignUpPage } from '../sign-up/sign-up';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private _authService: AuthenticationService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  login() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    const loading = this.loadingCtrl.create({
      content: 'Entrando...'
    });
    loading.present();
    if (this.loginForm.valid) {
      this._authService
        .login(email, password)
        .then(data => {
          loading.dismiss();
          this.navCtrl.setRoot(TabsPage);
        })
        .catch(err => {
          loading.dismiss();
          this.onLoginError(err);
        });
    }
  }

  onLoginError(err: any) {
    const wrongPassword = 'auth/wrong-password';
    const userNotFound = 'auth/user-not-found';
    let errorMessage = 'Tente novamente mais tarde';
    switch (err.code) {
      case wrongPassword:
        errorMessage = 'Senha incorreta';
        break;

      case userNotFound:
        errorMessage = 'Usuário não encontrado';
        break;
    }
    const alert = this.alertCtrl.create({
      title: 'Erro ao entrar',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

  goToSignUpPage() {
    this.navCtrl.push(SignUpPage);
  }
}
