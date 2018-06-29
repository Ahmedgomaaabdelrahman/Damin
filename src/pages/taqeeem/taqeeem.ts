import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {ConfigProvider} from "../../providers/config/config";

/**
 * Generated class for the TaqeeemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-taqeeem',
  templateUrl: 'taqeeem.html',
})
export class TaqeeemPage {
  formData = {
    customers_id: '',
    customers_order_id: '',
    rate: '',
    comment: ''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: Http,
              public shared: SharedDataProvider,
              public config: ConfigProvider) {
    this.formData.customers_order_id = this.navParams.get('customers_order_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaqeeemPage');
  }
  rate(star) {
    this.formData.rate = star;
    console.log(this.formData.rate)
  }
  addReviewAndRating() {
    this.shared.show();
    this.formData.customers_id = this.shared.customerData.customers_id;
    console.log(this.formData)
    this.http.post(this.config.url + 'api/makeRating', this.formData).map(res => res.json()).subscribe(data => {
      this.shared.hide();
      if (data.success == 1) {
        console.log("success");
        this.navCtrl.popToRoot();
        this.shared.showAlert('تم اضافة التقيم بنجاح');
      }
      if (data.success == 0) {
        this.shared.showAlert(data.message);
      }
    });
  }
}
