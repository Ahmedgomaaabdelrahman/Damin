import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DamindetailsPage } from './../damindetails/damindetails';
import { ContactusPage } from './../contactus/contactus';
import { BankaccountsPage } from '../bankaccounts/bankaccounts';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }


  goBankDetails(){
    this.navCtrl.push(DamindetailsPage);
  }

  contactUs(){
    this.navCtrl.push(ContactusPage);
  }
  addBankAccount(){
    this.navCtrl.push(BankaccountsPage);
  }
}
