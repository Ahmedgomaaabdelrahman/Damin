import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewpasswoedPage } from '../newpasswoed/newpasswoed';

/**
 * Generated class for the CodeforgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-codeforget',
  templateUrl: 'codeforget.html',
})
export class CodeforgetPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CodeforgetPage');
  }

  gopass(){
    this.navCtrl.push(NewpasswoedPage);
  }
  back(){
    this.navCtrl.pop();
  }
}
 