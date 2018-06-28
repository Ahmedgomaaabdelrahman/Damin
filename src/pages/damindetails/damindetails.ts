import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {ConfigProvider} from "../../providers/config/config";

/**
 * Generated class for the DamindetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-damindetails',
  templateUrl: 'damindetails.html',
})
export class DamindetailsPage {
  public formData: { [k: string]: any } = {};
  bankData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
              public shared: SharedDataProvider,
              public config: ConfigProvider) {
  }
  ionViewDidLoad() {
    this.formData.customers_id = this.shared.customerData.customers_id;
    console.log(this.formData)
    this.shared.show()
    this.http.post(this.config.url + 'api/getBanks', this.formData).map(res => res.json()).subscribe(data => {
      this.shared.hide();
      this.bankData = data.data
      console.log(data);
    }, error1 => {
      console.log(error1)
    });
    console.log('ionViewDidLoad DamindetailsPage');
  }

}
