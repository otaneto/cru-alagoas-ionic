import { Component, onInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-meetings',
  templateUrl: 'meetings.html'
})
export class MeetingsPage implements onInit {
		items: any [];
		itemsFound: any[];
  constructor(public navCtrl: NavController) {
  	
  }

  ngOnInit() {
  	this.initItemsArray();
  }


  initItemsArray() {
  	this.items =  [
  		{ name: 'Discipulado UFAL' },
  		{ name: 'Reunião Unit' },
  		{ name: 'Reunião UFAL' },
  		{ name: 'Reunião IFAL' }
  	];

  	this.itemsFound = this.items;
  }

  getItems(event: any) {
  	
    const value = event.target.value;

    const expression = new RegExp(value, 'i');
    this.itemsFound = this.items.filter(item => expression.test(item.name));
  }

  showMeeting(name: string) {
  	console.log(name);
  }

}
