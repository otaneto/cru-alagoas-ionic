import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from 'ionic-angular';
import { AuthenticationService } from '../../services/authentication.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  userForm: FormGroup;
  user: any = {};

  constructor(
    private alertCtrl: AlertController,
    private _authService: AuthenticationService,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.initForms();
    this.getUser();
  }

  getUser() {
    const loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    loading.present();
    const user = this.userService.getAuthenticatedUser();
    this.user = { id: user.uid };
    this.userService
      .getUserInfo(user.uid)
      .then(data => {
        this.user = { ...this.user, ...data.val() };
        loading.dismiss();
        this.initFormsWithValue();
      })
      .catch(err => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Erro ao carregar usuário',
          message: err.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  initForms() {
    this.userForm = this.fb.group({
      birthday: [''],
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  initFormsWithValue() {
    this.userForm.patchValue({
      birthday: this.user.birthday,
      name: this.user.name,
      email: this.user.email
    });
  }

  logout() {
    this._authService.logout();
  }

  updateUser(field) {
    const body = {
      ...this.user,
      ...this.userForm.value
    };
    const previousValue = this.user[field];
    const currentValue = this.userForm.get(field).value;

    console.log(body);

    if (this.userForm.get(field).valid && previousValue !== currentValue) {
      this.userService
        .updateUser(body)
        .then(data => {
          this.onSuccessUpdateUser(data);
        })
        .catch(err => {
          this.onUpdateUserError(err);
        });
    }
  }

  onSuccessUpdateUser(data) {
    console.log(data);
  }

  onUpdateUserError(err) {
    const alert = this.alertCtrl.create({
      title: 'Não é possivel atualizar o usuário',
      message: err.message,
      buttons: ['Ok']
    });

    alert.present();
  }

  onFormInvalid() {
    const alert = this.alertCtrl.create({
      title: 'Não é possivel atualizar o usuário',
      message: 'Por favor, preencha todos os campos',
      buttons: ['Ok']
    });

    alert.present();
  }

  updateDate(birthday) {
    this.updateUser('birthday');
  }
}
