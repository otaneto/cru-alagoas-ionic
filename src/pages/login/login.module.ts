import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginPage } from './login';
import { AuthenticationService } from '../../services/authentication.service';

@NgModule({
  declarations: [LoginPage],
  imports: [IonicPageModule.forChild(LoginPage), ReactiveFormsModule],
  providers: [AuthenticationService]
})
export class LoginPageModule {}
