import {Component, ViewChild} from '@angular/core';
import {MenuController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {MyoperationsPage} from './../pages/myoperations/myoperations';
import {Nav} from 'ionic-angular';
import {EditprofilePage} from './../pages/editprofile/editprofile';
import {ProfilePage} from '../pages/profile/profile';
import {SharedDataProvider} from "../providers/shared-data/shared-data";
import {Storage} from "@ionic/storage";
import {HomePage} from "../pages/home/home";
import { MyratingsPage } from '../pages/myratings/myratings';
import { NotificationsPage } from '../pages/notifications/notifications';
import { AsksomebodyPage } from '../pages/asksomebody/asksomebody';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  @ViewChild(Nav) nav: Nav;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public shared: SharedDataProvider,
    private storage: Storage,
    public menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.storage.get('customerData').then((val) => {
        console.log(val);
        if (val && (Object.keys(val).length === 0) ){
          this.menuCtrl.enable(false, 'myMenu');
          console.log('false')
        }else if (val === null) {
          this.menuCtrl.enable(false, 'myMenu');
          console.log('false')
        } else if (val && (Object.keys(val).length !== 0)) {
          this.menuCtrl.enable(true, 'myMenu');
          console.log('true')
        }
      });
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

  openRating(){
    this.nav.push(MyratingsPage);
  }
  openNotification(){
    this.nav.push(NotificationsPage);
  }
  askForSomeone(){
    this.nav.push(AsksomebodyPage);
  }
  //Log Out
  logOut() {
    this.menuCtrl.enable(false, 'myMenu');
    this.shared.logOut();
    this.nav.setRoot(HomePage)
  }
}

