import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SignupPage} from "../signup/signup";
import {LoginPage} from "../login/login";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {CreateoperationPage} from "../createoperation/createoperation";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public shared: SharedDataProvider) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  myaccont() {
    this.navCtrl.push(LoginPage);
  }

  newAccount() {
    this.navCtrl.push(SignupPage);
  }
  opennew(id) {
    if (this.shared.customerData.customers_id == null || this.shared.customerData.customers_id == undefined) {
      this.navCtrl.push(LoginPage)
      console.log('not sign In')
    }
    else {
      console.log('sign In');
      this.navCtrl.push(CreateoperationPage, {selectOperation: id});
    }
  }
}
