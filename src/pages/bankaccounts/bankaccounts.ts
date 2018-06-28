import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AddbankaccountPage} from './../addbankaccount/addbankaccount';
import {HomePage} from "../home/home";
import {ConfigProvider} from "../../providers/config/config";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {Http} from "@angular/http";

/**
 * Generated class for the BankaccountsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-bankaccounts',
  templateUrl: 'bankaccounts.html',
})
export class BankaccountsPage {
  public formData: { [k: string]: any } = {};
  success: any;
  bankInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: Http,
              public shared: SharedDataProvider,
              public config: ConfigProvider,) {
  }

  ionViewWillEnter() {
    this.bankDetail();
  }

  bankDetail() {
    this.shared.show()
    this.formData.customers_id = this.shared.customerData.customers_id;
    this.http.post(this.config.url + 'api/getCustomerBanks', this.formData).map(res => res.json()).subscribe(data => {
      this.shared.hide();
      if (data.success == 1) {
        console.log(data);
        this.success = data.success;
        this.bankInfo = data.data;
      }
      if (data.success == 0) {
        console.log(data)
        this.success = data.success;
      }
    }, error1 => {
      console.log(error1)
    });
  }

  deleteBank(id) {
    this.shared.show()
    this.formData.bank_id = id;
    this.http.post(this.config.url + 'api/deleteCustomerBanks', this.formData).map(res => res.json()).subscribe(data => {
      this.shared.hide();
      if (data.success == 1) {
        console.log(data);
        this.bankDetail();
      }
      if (data.success == 0) {
        console.log(data)
      }
    }, error1 => {
      console.log(error1)
    });
  }

  updateBank(id) {
    this.navCtrl.push(AddbankaccountPage, {type: 'update', item: id});
  }

  newAccount() {
    this.navCtrl.push(AddbankaccountPage);
  }
}
