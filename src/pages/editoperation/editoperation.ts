import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {ConfigProvider} from "../../providers/config/config";

/**
 * Generated class for the EditoperationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-editoperation',
  templateUrl: 'editoperation.html',
})
export class EditoperationPage {
  public formData: { [k: string]: any } = {};
  order_description: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: Http,
              public shared: SharedDataProvider,
              public config: ConfigProvider) {
    this.formData.order_id = this.navParams.get('orders_id');
    this.formData.customers_id = this.navParams.get('customers_id');
    this.formData.customers_order_id = this.navParams.get('customers_order_id');
    this.order_description = this.navParams.get('order_description');
    this.formData.status = this.navParams.get('status');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditoperationPage');
  }

  editOperation() {
    console.log(this.formData);

    this.http.post(this.config.url + 'api/cheackOrder', this.formData).map(res => res.json()).subscribe(data => {
      this.shared.hide();
      console.log(data);
      if(data.success = 1){
       this.shared.showAlert('تم اضافة طلب التعديل');
        this.navCtrl.popToRoot()
      }else if(data.success = 0) {
        this.shared.showAlert(data.message);
      }
    }, error1 => {
      console.log(error1)
    });
  }
}
