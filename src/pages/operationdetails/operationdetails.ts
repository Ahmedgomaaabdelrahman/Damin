import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SharedDataProvider} from "../../providers/shared-data/shared-data";

/**
 * Generated class for the OperationdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-operationdetails',
  templateUrl: 'operationdetails.html',
})
export class OperationdetailsPage {
  childOrder: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public shared: SharedDataProvider) {
    this.childOrder = this.navParams.get('order');
    console.log(this.childOrder)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OperationdetailsPage');
  }
  formatDate(obj) {
    return obj.toString().replace(/-/g, "/");
  }
}
