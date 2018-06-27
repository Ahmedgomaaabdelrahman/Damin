import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ConfigProvider} from "../../providers/config/config";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {Http} from "@angular/http";

/**
 * Generated class for the AddbankaccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-addbankaccount',
  templateUrl: 'addbankaccount.html',
})
export class AddbankaccountPage {
  formBank = {
    customers_id: '',
    customers_name: '',
    bank_name: '',
    account_num: '',
    IBAN: '',
    bank_id:''
  };
  type: any;
  item: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              public shared: SharedDataProvider,
              public config: ConfigProvider,) {
    this.type = navParams.get('type');
    this.item = navParams.get('item');
    console.log(this.type)
    if (this.type == 'update') {
      this.formBank.customers_name = this.item.customers_name;
      this.formBank.bank_name = this.item.bank_name;
      this.formBank.account_num = this.item.account_num;
      this.formBank.IBAN = this.item.IBAN;

    }
    if (this.type != 'update') {
      this.formBank.customers_name = '';
      this.formBank.bank_name = '';
      this.formBank.account_num = '';
      this.formBank.IBAN = '';
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddbankaccountPage');
  }

  addBank() {
    this.shared.show()
    this.formBank.customers_id = this.shared.customerData.customers_id;
    console.log(this.formBank)
    this.http.post(this.config.url + 'api/addCustomerBanks', this.formBank).map(res => res.json()).subscribe(data => {
      this.shared.hide()
      if (data.success == 1) {
        console.log(data)
        this.navCtrl.pop();
        this.shared.showAlert(data.message)
      }
      if (data.success == 0) {
        console.log(data);
        this.shared.showAlert(data.message)
      }
    }, error1 => {
      console.log(error1)
      this.shared.showAlert(error1)
    });
  }
  updateBank() {
    this.shared.show()
    this.formBank.customers_id = this.shared.customerData.customers_id;
    this.formBank.bank_id = this.item.bank_id;
    console.log(this.formBank)
    this.http.post(this.config.url + 'api/editCustomerBanks', this.formBank).map(res => res.json()).subscribe(data => {
      this.shared.hide()
      if (data.success == 1) {
        console.log(data)
        this.navCtrl.pop();
        this.shared.showAlert(data.message)
      }
      if (data.success == 0) {
        console.log(data);
        this.shared.showAlert(data.message)
      }
    }, error1 => {
      console.log(error1)
      this.shared.showAlert(error1)
    });
  }

}
