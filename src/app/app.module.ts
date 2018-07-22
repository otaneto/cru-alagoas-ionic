import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { HttpClientModule } from '@angular/common/http';

// Pages
import { EventsPage } from '../pages/events/events';
import { PostsPage } from '../pages/posts/posts';
import { MeetingsPage } from '../pages/meetings/meetings';
import { UserPage } from '../pages/user/user';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ShowMeetingPage } from '../pages/show-meeting/show-meeting';
import { ShowPostPage } from '../pages/show-post/show-post';
import { ShowEventPage } from '../pages/show-event/show-event';
import { NewMeetingPage } from '../pages/new-meeting/new-meeting';
import { SelectLocationPage } from '../pages/select-location/select-location';

import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FIREBASE_CONFIG } from '../constants/firebase_config';

// Services
import { GooglePlus } from '@ionic-native/google-plus';
import { Camera } from '@ionic-native/camera';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { MeetingsService } from './../pages/meetings/meetings.service';
import { LocationService } from '../pages/select-location/location.service';

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
    ShowPostPage,
    ShowEventPage,
    NewMeetingPage,
    SelectLocationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    SelectSearchableModule,
    HttpClientModule
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
    ShowPostPage,
    ShowEventPage,
    NewMeetingPage,
    SelectLocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthenticationService,
    UserService,
    MeetingsService,
    LocationService,
    GooglePlus,
    Camera
  ]
})
export class AppModule {}
