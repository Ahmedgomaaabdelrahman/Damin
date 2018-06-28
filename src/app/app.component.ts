import {Component, ViewChild} from '@angular/core';
import {MenuController, ModalController, Platform} from 'ionic-angular';
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
import { BalancePage } from '../pages/balance/balance';
import { SettingsPage } from './../pages/settings/settings';
import { MessagesPage } from './../pages/messages/messages';
import { BankaccountsPage } from './../pages/bankaccounts/bankaccounts';
import {Network} from '@ionic-native/network';
import {NoInternetPage} from "../pages/no-internet/no-internet";

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
    public network: Network,
    public modalCtrl: ModalController,
    public menuCtrl: MenuController) {
    let connectedToInternet = true;
    network.onDisconnect().subscribe(() => {
      connectedToInternet = false;
      let modal = this.modalCtrl.create(NoInternetPage);
      modal.present();

    });

    network.onConnect().subscribe(() => {
      if (!connectedToInternet) {
        window.location.reload();
        //this.loading.show();
        this.shared.showAlert('تم الاتصال مرة اخري وجاري  إعادة تحميل البيانات');
      }
      //connectSubscription.unsubscribe();
    });
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
  openBalance(){
    this.nav.push(BalancePage);
  }

  openSettings() {
    this.nav.push(SettingsPage);
  }
  openMessages() {
    this.nav.push(MessagesPage);
  }

  //Log Out
  logOut() {
    this.menuCtrl.enable(false, 'myMenu');
    this.shared.logOut();
    this.nav.setRoot(HomePage)
  }
}

