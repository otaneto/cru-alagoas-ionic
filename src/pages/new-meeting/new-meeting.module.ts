import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewMeetingPage } from './new-meeting';

@NgModule({
  declarations: [
    NewMeetingPage,
  ],
  imports: [
    IonicPageModule.forChild(NewMeetingPage),
  ],
})
export class NewMeetingPageModule {}
