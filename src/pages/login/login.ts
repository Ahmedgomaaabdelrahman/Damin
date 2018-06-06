import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ForgetpassPage} from './../forgetpass/forgetpass';
import {Http} from '@angular/http';
import {WelcomePage} from "../welcome/welcome";
import {ConfigProvider} from "../../providers/config/config";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  formData = {customers_email_address: '', customers_password: ''};
  errorMessage = '';

  constructor(public navCtrl: NavController,
              public http: Http,
              public shared: SharedDataProvider,
              public config: ConfigProvider,
              public navParams: NavParams) {
  }


  login() {
    this.shared.autoHide(500)
    this.errorMessage = '';
    this.http.post(this.config.url + 'processLogin', this.formData).map(res => res.json()).subscribe(data => {
      if (data.success == 1) {
        console.log(data.data[0])
        this.shared.login(data.data[0]);
        this.navCtrl.setRoot(WelcomePage)
      }
      if (data.success == 0) {
        this.errorMessage = data.message;
      }
    },error1 => {
      console.log(error1)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  back() {
    this.navCtrl.pop();
  }

  forgetPass() {
    this.navCtrl.push(ForgetpassPage);
  }
}
