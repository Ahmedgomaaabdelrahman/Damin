import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CodeforgetPage } from '../codeforget/codeforget';

/**
 * Generated class for the ForgetpassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-forgetpass',
  templateUrl: 'forgetpass.html',
})
export class ForgetpassPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpassPage');
  }
  back(){
    this.navCtrl.pop();
  } 
  forget(){
    this.navCtrl.push(CodeforgetPage);
  }
}
