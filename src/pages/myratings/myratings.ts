import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {ConfigProvider} from "../../providers/config/config";
import {Http} from "@angular/http";

/**
 * Generated class for the MyratingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-myratings',
  templateUrl: 'myratings.html',
})
export class MyratingsPage {
  public formData: { [k: string]: any } = {};
  myRating: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: Http,
              public shared: SharedDataProvider,
              public config: ConfigProvider) {
    this.formData.customers_id = this.shared.customerData.customers_id;
    console.log(this.formData)
    this.shared.show()
    this.http.post(this.config.url + 'api/getCustomerRate', this.formData).map(res => res.json()).subscribe(data => {
      this.shared.hide();
      this.myRating =  data.data
      console.log(data);
    }, error1 => {
      console.log(error1)
    });
  }

  formatDate(obj) {
    return obj.toString().replace(/-/g, "/");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyratingsPage');
  }

}
