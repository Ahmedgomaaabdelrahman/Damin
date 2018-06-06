import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {LoginPage} from './../login/login';
import {SignupPage} from '../signup/signup';
import {ProfilePage} from './../profile/profile';
import {SharedDataProvider} from "../../providers/shared-data/shared-data";

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public shared: SharedDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  myaccont() {
    this.navCtrl.push(LoginPage);
  }

  newAccount() {
    this.navCtrl.push(SignupPage);
  }

  openOper() {
    this.navCtrl.push(ProfilePage);
  }
  logOut() {
    this.shared.logOut();
  }
}
