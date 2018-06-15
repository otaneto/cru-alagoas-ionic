import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShowPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-post',
  templateUrl: 'show-post.html'
})
export class ShowPostPage {
  post: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit() {
    this.post = this.navParams.data;
  }
}
