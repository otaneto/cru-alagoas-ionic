import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShowEventPage } from '../show-event/show-event';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {
  events: any[];
  eventsFound: any[];
  constructor(public navCtrl: NavController) {}

  ngOnInit() {
    this.initEventsArray();
  }

  initEventsArray() {
    this.events = [
      { name: 'AGORA 2018' },
      { name: 'Encontrão Café com a CRU' }
    ];
    this.eventsFound = this.events;
  }

  getEvents(event: any) {
    const value = event.target.value;

    const expression = new RegExp(value, 'i');
    this.eventsFound = this.events.filter(item => expression.test(item.name));
  }

  showEvent(event: any) {
    this.navCtrl.push(ShowEventPage, { ...event });
  }
}
