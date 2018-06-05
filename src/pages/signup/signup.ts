import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from './../login/login';
import { ActivationcodePage } from './../activationcode/activationcode';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


  back(){
    this.navCtrl.pop();
  }

  login (){
    this.navCtrl.push(LoginPage);
  }
 
  acivation(){
    this.navCtrl.push(ActivationcodePage);
  }
}
