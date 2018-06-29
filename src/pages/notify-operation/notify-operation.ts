import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AcceptoperationPage} from './../acceptoperation/acceptoperation';
import {EditoperationPage} from './../editoperation/editoperation';
import {AlertController} from 'ionic-angular';
import {ConfigProvider} from "../../providers/config/config";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {Http} from "@angular/http";
import {PhotoViewer} from "@ionic-native/photo-viewer";

/**
 * Generated class for the NotifyOperationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notify-operation',
  templateUrl: 'notify-operation.html',
})
export class NotifyOperationPage {
  refuse: any;
  public formData: { [k: string]: any } = {};
  orderDetails: any;

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams,
              public http: Http,
              public shared: SharedDataProvider,
              private photoViewer: PhotoViewer,
              public config: ConfigProvider) {
    this.formData.orders_id = this.navParams.get('order_id');
    this.formData.customers_id = this.shared.customerData.customers_id;
    console.log(this.formData)
    this.shared.show()
    this.http.post(this.config.url + 'api/detailsOrders', this.formData).map(res => res.json()).subscribe(data => {
      this.shared.hide();
      console.log(data);
      this.orderDetails = data.data;
      console.log(this.orderDetails);
      console.log(this.orderDetails.customers_order_id);

    }, error1 => {
      console.log(error1)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotifyOperationPage');
  }


  disableOperation() {
    this.refuse = !this.refuse;
  }

  refuseOperation(customers_order_id) {
    this.refuse = !this.refuse;
    var option = {
      order_id: this.formData.orders_id,
      customers_id: this.formData.customers_id,
      customers_order_id: customers_order_id,
      comments: this.formData.comments,
      status: '3',
    }
    console.log(option);
    this.http.post(this.config.url + 'api/cheackOrder', option).map(res => res.json()).subscribe(data => {
      this.shared.hide();
      console.log(data);
      if (data.success = 1) {
        this.shared.showAlert('تم الغاء الطلب');
        this.navCtrl.popToRoot()
      } else if (data.success = 0) {
        this.shared.showAlert(data.message);
      }
    }, error1 => {
      console.log(error1)
    });
  }

  accept(customers_order_id) {
    this.navCtrl.push(AcceptoperationPage, {
      order_id: this.formData.orders_id,
      customers_order_id: customers_order_id,
    });
  }

  edit(customers_order_id, order_description) {
    var option = {
      orders_id: this.formData.orders_id,
      customers_id: this.formData.customers_id,
      customers_order_id: customers_order_id,
      order_description: order_description,
      status: '4',
    }
    this.navCtrl.push(EditoperationPage, option);
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',

        }
      ]
    });
    alert.present();
  }

  preview(id) {
    this.photoViewer.show(this.config.url + id);
  }
}
