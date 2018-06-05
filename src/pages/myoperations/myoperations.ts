import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OperationstatusPage } from './../operationstatus/operationstatus';
import { OperationdetailsPage } from './../operationdetails/operationdetails';

/**
 * Generated class for the MyoperationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-myoperations',
  templateUrl: 'myoperations.html',
})
export class MyoperationsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyoperationsPage');
  }
 
  operationStats(){
    this.navCtrl.push(OperationstatusPage);
  }

  openDetails(){
    this.navCtrl.push(OperationdetailsPage);
  }
}
