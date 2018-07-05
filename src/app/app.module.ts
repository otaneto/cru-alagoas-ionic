import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

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

import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FIREBASE_CONFIG } from '../constants/firebase_config';

// Services
import { AuthenticationService } from '../services/authentication.service';
import { GooglePlus } from '@ionic-native/google-plus';

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
    ShowEventPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule
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
    ShowEventPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthenticationService,
    GooglePlus
  ]
})
export class AppModule {}
