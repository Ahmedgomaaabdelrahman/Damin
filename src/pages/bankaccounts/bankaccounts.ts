import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddbankaccountPage } from './../addbankaccount/addbankaccount';

/**
 * Generated class for the BankaccountsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-bankaccounts',
  templateUrl: 'bankaccounts.html',
})
export class BankaccountsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankaccountsPage');
  }

  newAccount(){
    this.navCtrl.push(AddbankaccountPage);
  }
}
