import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OperationstatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-operationstatus',
  templateUrl: 'operationstatus.html',
})
export class OperationstatusPage {
  childOrder: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.childOrder = this.navParams.get('order');
    console.log(this.childOrder)
    console.log(this.childOrder.orders_status)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OperationstatusPage');
  }
  formatDate(obj) {
    return obj.toString().replace(/-/g, "/");
  }
}
