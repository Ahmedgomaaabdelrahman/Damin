import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AcceptoperationPage } from './../acceptoperation/acceptoperation';
import { EditoperationPage } from './../editoperation/editoperation';

/**
 * Generated class for the NotifyOperationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notify-operation',
  templateUrl: 'notify-operation.html',
})
export class NotifyOperationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotifyOperationPage');
  }


  accept(){
    this.navCtrl.push(AcceptoperationPage);
  }

  edit(){
    this.navCtrl.push(EditoperationPage);
  }
}
