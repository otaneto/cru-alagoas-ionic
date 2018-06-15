import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowPostPage } from './show-post';

@NgModule({
  declarations: [
    ShowPostPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowPostPage),
  ],
})
export class ShowPostPageModule {}
