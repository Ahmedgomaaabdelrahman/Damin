import {Component, ViewChild} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {WelcomePage} from './../pages/welcome/welcome';
import {MyoperationsPage} from './../pages/myoperations/myoperations';
import {Nav} from 'ionic-angular';
import {EditprofilePage} from './../pages/editprofile/editprofile';
import {ProfilePage} from '../pages/profile/profile';
import {SharedDataProvider} from "../providers/shared-data/shared-data";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = WelcomePage;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public shared: SharedDataProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openEdit() {
    this.nav.push(EditprofilePage);
  }

  openmyData() {
    this.nav.push(ProfilePage);
  }

  openOperations() {
    this.nav.push(MyoperationsPage);
  }
  //Log Out
  logOut() {
    this.shared.logOut();
    this.nav.setRoot(WelcomePage)
  }
}

