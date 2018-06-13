import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowMeetingPage } from './show-meeting';

@NgModule({
  declarations: [
    ShowMeetingPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowMeetingPage),
  ],
})
export class ShowMeetingPageModule {}
