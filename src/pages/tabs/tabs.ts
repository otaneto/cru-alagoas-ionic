import { Component } from '@angular/core';

import { PostsPage } from '../posts/posts';
import { EventsPage } from '../events/events';
import { MeetingsPage } from '../meetings/meetings';
import { UserPage } from '../user/user';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MeetingsPage;
  tab2Root = PostsPage;
  tab3Root = EventsPage;
  tab4Root = UserPage;

  constructor() {

  }
}
