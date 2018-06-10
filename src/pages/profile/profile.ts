import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditprofilePage } from './../editprofile/editprofile';
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {LoginPage} from "../login/login";
import {ConfigProvider} from "../../providers/config/config";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public shared: SharedDataProvider,public config: ConfigProvider) {
  }
  ionViewWillEnter() {
    if (this.shared.customerData.customers_id == null || this.shared.customerData.customers_id == undefined) {
      this.navCtrl.push(LoginPage)
      console.log('not sign In')
    }
    else {
      console.log('sign In')
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  editProfile(){
    this.navCtrl.push(EditprofilePage);
  }
}
