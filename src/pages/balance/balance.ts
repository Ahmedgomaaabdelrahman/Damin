import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AddBalancePage} from '../add-balance/add-balance';
import {ConfigProvider} from "../../providers/config/config";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {Http} from "@angular/http";

/**
 * Generated class for the BalancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-balance',
  templateUrl: 'balance.html',
})
export class BalancePage {
  public formData: { [k: string]: any } = {};
  money: any;
  success: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: Http,
              public shared: SharedDataProvider,
              public config: ConfigProvider,) {
    this.shared.show()

    this.formData.customers_id = this.shared.customerData.customers_id;

    this.http.post(this.config.url + 'api/account_balance', this.formData).map(res => res.json()).subscribe(data => {
      this.shared.hide();
      if (data.success == 1) {
        console.log(data);
        this.money = data.data;
        this.success = data.success;
      }
      if (data.success == 0) {
        console.log(data)
        this.success = data.success;
      }
    }, error1 => {
      console.log(error1)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BalancePage');
  }

  addBalace() {
    this.navCtrl.push(AddBalancePage);
  }
}
