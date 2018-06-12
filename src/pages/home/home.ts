import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SignupPage} from "../signup/signup";
import {LoginPage} from "../login/login";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";

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
}
