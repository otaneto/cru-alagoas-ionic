import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SignUpPage } from './sign-up';
import { AuthenticationService } from '../../services/authentication.service';

@NgModule({
  declarations: [
    SignUpPage,
  ],
  imports: [
    IonicPageModule.forChild(SignUpPage),
  ],
  providers: [AuthenticationService]
})
export class SignUpPageModule {}
