import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TaqeeemPage} from "../taqeeem/taqeeem";
import {Http} from "@angular/http";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {ConfigProvider} from "../../providers/config/config";

/**
 * Generated class for the BanktransferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-banktransfer',
  templateUrl: 'banktransfer.html',
})
export class BanktransferPage {
  formData = {
    customers_id: '',
    customers_order_id: '',
    order_id: '',
    customers_name: '',
    bank_name: '',
    account_num: '',
    price: '',
    invoice_number: ''
  };
  bankInfo: any;
  errorMessage: '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: Http,
              public shared: SharedDataProvider,
              public config: ConfigProvider) {
    this.shared.show();
    this.formData.customers_id = this.shared.customerData.customers_id;
    this.formData.customers_order_id = this.navParams.get('customers_order_id');
    this.formData.order_id = this.navParams.get('order_id');
    this.http.post(this.config.url + 'api/getCustomerBanks', this.formData).map(res => res.json()).subscribe(data => {
      this.shared.hide();
      if (data.success == 1) {
        console.log(data);
        this.bankInfo = data.data;
      }
      if (data.success == 0) {
        console.log(data)
      }
    }, error1 => {
      console.log(error1)
    });
  }

  select(id) {
    this.formData.bank_name = id;
    console.log(this.formData)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BanktransferPage');
  }

  taqeem() {
    this.shared.show();
    this.formData.customers_id = this.shared.customerData.customers_id;
    this.http.post(this.config.url + 'api/bankTransfer', this.formData).map(res => res.json()).subscribe(data => {
      this.shared.hide();
      if (data.success == 1) {
        console.log(data);
        this.navCtrl.push(TaqeeemPage,{
          customers_order_id: this.formData.customers_order_id
        });
      }
      if (data.success == 0) {
        this.shared.showAlert(data.message)
      }
    }, error1 => {
      console.log(error1)
    });
  }
}
