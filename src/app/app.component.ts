import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { WelcomePage } from './../pages/welcome/welcome';
import { MyoperationsPage } from './../pages/myoperations/myoperations';
import { ChatPage } from '../pages/chat/chat';
import { NavController, Nav, MenuController} from 'ionic-angular';
import { EditprofilePage } from './../pages/editprofile/editprofile';
import { ProfilePage } from '../pages/profile/profile';
import { MyratingsPage } from '../pages/myratings/myratings';
import { NotificationsPage } from '../pages/notifications/notifications';
import { AsksomebodyPage } from './../pages/asksomebody/asksomebody';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = WelcomePage;
  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openEdit(){ 
    this.nav.push(EditprofilePage);
  }

  openmyData(){
    this.nav.push(ProfilePage);
  }

  openOperations(){
    this.nav.push(MyoperationsPage);
  }

  openRating(){
    this.nav.push(MyratingsPage);
  }
  openNotification(){
    this.nav.push(NotificationsPage);
  }
  askForSomeone(){
    this.nav.push(AsksomebodyPage);
  }
}

