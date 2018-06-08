import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OperationstatusPage } from './../operationstatus/operationstatus';
import { OperationdetailsPage } from './../operationdetails/operationdetails';
import { CreateoperationPage } from './../createoperation/createoperation';

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
  chosFlag : boolean = false ;
  addFlag : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyoperationsPage');
    this.chosFlag = false;
    this.addFlag = false;
  }
  
  ionViewWillEnter(){
    console.log('ionViewDidLoad MyoperationsPage');
    this.chosFlag = false;
    this.addFlag = false;
  }
  operationStats(){ 
    this.navCtrl.push(OperationstatusPage);
  }

  openDetails(){
    this.navCtrl.push(OperationdetailsPage);
  }
  openChos(){
    this.chosFlag = !this.chosFlag;
  }
  changeImg(){
    this.addFlag = true;
    console.log(this.addFlag);
  }
  opennew() {
    this.navCtrl.push(CreateoperationPage);
    
  }
}
