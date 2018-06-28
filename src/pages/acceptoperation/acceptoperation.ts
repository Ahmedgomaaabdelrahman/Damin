import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BanktransferPage } from './../banktransfer/banktransfer';

/**
 * Generated class for the AcceptoperationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-acceptoperation',
  templateUrl: 'acceptoperation.html',
})
export class AcceptoperationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcceptoperationPage');
  }

  transfer(){
    this.navCtrl.push(BanktransferPage);
  }
}
