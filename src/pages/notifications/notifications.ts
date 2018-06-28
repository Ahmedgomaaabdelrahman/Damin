import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NotifyOperationPage} from './../notify-operation/notify-operation';
import {Http} from "@angular/http";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {ConfigProvider} from "../../providers/config/config";

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  public formData: { [k: string]: any } = {};
  myNotify: any;
  success: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: Http,
              public shared: SharedDataProvider,
              public config: ConfigProvider) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  ionViewWillEnter() {
    this.formData.customers_id = this.shared.customerData.customers_id;
    console.log(this.formData)
    this.shared.show()
    this.http.post(this.config.url + 'api/getNotifications', this.formData).map(res => res.json()).subscribe(data => {
      this.shared.hide();
      this.myNotify = data.data;
      this.success = data.success;
      console.log(data);
    }, error1 => {
      console.log(error1)
    });
  }

  openNotify(last_action,id) {
    console.log(last_action)
    if (last_action == 0) {
      this.navCtrl.push(NotifyOperationPage,{order_id: id});
    } else if (last_action == 1) {
      this.shared.showAlert('تم اغلاق العملية')
    }
  }
}
