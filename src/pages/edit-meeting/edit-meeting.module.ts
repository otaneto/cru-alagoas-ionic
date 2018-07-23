import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditMeetingPage } from './edit-meeting';

@NgModule({
  declarations: [
    EditMeetingPage,
  ],
  imports: [
    IonicPageModule.forChild(EditMeetingPage),
  ],
})
export class EditMeetingPageModule {}
