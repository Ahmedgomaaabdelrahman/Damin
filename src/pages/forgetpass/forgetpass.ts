import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CodeforgetPage } from '../codeforget/codeforget';
import {ConfigProvider} from "../../providers/config/config";
import {Http} from "@angular/http";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";

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
  formData = {
    customers_email_address: '',
  };
  errorMessage = '';
  constructor(
    public navCtrl: NavController,
    public shared: SharedDataProvider,
    public http: Http,
    public config: ConfigProvider,
    public navParams: NavParams,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpassPage');
  }
  back(){
    this.navCtrl.pop();
  }
  forgetPassword() {
    this.shared.show();
    this.errorMessage = '';
    console.log(this.formData)
    this.http.post(this.config.url + 'processForgotPassword', this.formData).map(res => res.json()).subscribe(data => {
      this.shared.hide();
      if (data.success == 1) {
        console.log(data)
        this.navCtrl.push(CodeforgetPage, {email: this.formData.customers_email_address});
      }
      if (data.success == 0) {
        this.errorMessage = data.message;
      }
    });
  }
}
