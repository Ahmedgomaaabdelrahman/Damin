import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from './../login/login';
import { ActivationcodePage } from './../activationcode/activationcode';
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {ConfigProvider} from "../../providers/config/config";
import {Http} from "@angular/http";
import {WelcomePage} from "../welcome/welcome";
import {HomePage} from "../home/home";

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
  formData = {
    customers_name: '',
    customers_email_address: '',
    customers_password: '',
    customers_telephone: ''
  };
  errorMessage = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public config: ConfigProvider,
    public shared: SharedDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signUp() {
    this.shared.show();
    this.errorMessage = '';
    console.log(this.formData)
    this.http.post(this.config.url + 'api/processRegistration', this.formData).map(res => res.json()).subscribe(data => {
      this.shared.hide();
      if (data.success == 1) {
        this.shared.login(data.data[0]);
        //this.config.customerData = data.data[0];
          this.navCtrl.setRoot(HomePage);
          console.log(data)
      }
      if (data.success == 0) {
        this.errorMessage = data.message;
      }
    });
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
