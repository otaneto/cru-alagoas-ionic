import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

// Pages
import { EventsPage } from '../pages/events/events';
import { PostsPage } from '../pages/posts/posts';
import { MeetingsPage } from '../pages/meetings/meetings';
import { UserPage } from '../pages/user/user';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ShowMeetingPage } from '../pages/show-meeting/show-meeting';

import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Services
import { AuthenticationService } from '../services/authentication.service';

@NgModule({
  declarations: [
    MyApp,
    EventsPage,
    PostsPage,
    MeetingsPage,
    UserPage,
    TabsPage,
    LoginPage,
    SignUpPage,
    ShowMeetingPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EventsPage,
    PostsPage,
    MeetingsPage,
    UserPage,
    TabsPage,
    LoginPage,
    SignUpPage,
    ShowMeetingPage,
  ],  
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticationService,
  ]
})
export class AppModule {}
