import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ConfigProvider} from "../../providers/config/config";
import {Http} from "@angular/http";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";

/**
 * Generated class for the NewpasswoedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-newpasswoed',
  templateUrl: 'newpasswoed.html',
})
export class NewpasswoedPage {

  formData = {
    customers_email_address: '',
    password: '',
    rePassword: ''
  };
  errorMessage = '';
  constructor(public navCtrl: NavController,
              public http: Http,
              public shared: SharedDataProvider,
              public config: ConfigProvider,
              public navParams: NavParams,) {
    console.log(this.navParams.get('email'))
    this.formData.customers_email_address = this.navParams.get('email');
  }

  rePassword() {
    this.shared.show();
    this.errorMessage = '';
    console.log(this.formData);
    this.formData.customers_email_address = this.navParams.get('email');
    this.http.post(this.config.url + 'api/change_password', this.formData).map(res => res.json()).subscribe(data => {
      this.shared.hide();
      console.log(data)
      if (data.success == 1) {
        this.shared.showAlert(data.message);
        this.navCtrl.popToRoot();
      }
      if (data.success == 0) {
        this.errorMessage = data.message;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewpasswoedPage');
  }
  back() {
    this.navCtrl.pop();
  }

}
