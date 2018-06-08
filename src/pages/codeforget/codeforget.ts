import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { NewpasswoedPage } from '../newpasswoed/newpasswoed';
import {Http} from "@angular/http";
import {ConfigProvider} from "../../providers/config/config";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";

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
  formData = {
    customers_email_address: '',
    key: '',
    key1: '',
    key2: '',
    key3: '',
    key4: '',
    key5: '',
    key6: ''
  };
  formDataRepeat = {
    customers_email_address: ''
  };
  errorMessage = '';
  constructor(public navCtrl: NavController,
              public shared: SharedDataProvider,
              public http: Http,
              public config: ConfigProvider,
              public navParams: NavParams,) {
    this.formData.customers_email_address = this.navParams.get('email');

  }
  verfyCode() {
    this.shared.show();
    this.errorMessage = '';
    console.log(this.formData);
    this.formData.key = this.formData.key1 + this.formData.key2 + this.formData.key3 + this.formData.key4 + this.formData.key5 + this.formData.key6
    this.formData.customers_email_address = this.navParams.get('email');
    this.http.post(this.config.url + 'check_verification', this.formData).map(res => res.json()).subscribe(data => {
      this.shared.hide();
      console.log(data)
      if (data.success == 1) {
        this.navCtrl.push(NewpasswoedPage, {email: this.formData.customers_email_address});
      }
      if (data.success == 0) {
        this.errorMessage = data.message;
      }
    });
  }
  reSendCode() {
    this.shared.show();
    this.errorMessage = '';
    this.formDataRepeat.customers_email_address = this.formData.customers_email_address;
    console.log(this.formDataRepeat.customers_email_address);
    this.http.post(this.config.url + 'processForgotPassword', this.formDataRepeat).map(res => res.json()).subscribe(data => {
      if (data.success == 1) {
        console.log(data)
        this.shared.hide();
        this.shared.showAlert('تم ارسال الكود الي بريدك الالكتروني مرة اخري')
      }
      if (data.success == 0) {
        this.errorMessage = data.message;
      }
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CodeforgetPage');
  }

  // gopass(){
  //   this.navCtrl.push(NewpasswoedPage);
  // }
  back(){
    this.navCtrl.pop();
  }

}
