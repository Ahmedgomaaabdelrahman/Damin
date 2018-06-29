import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {ConfigProvider} from "../../providers/config/config";

/**
 * Generated class for the ContactusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage {
  public formData: { [k: string]: any } = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: Http,
              public shared: SharedDataProvider,
              public config: ConfigProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactusPage');
  }
  contactSend(){
    console.log(this.formData)
    this.shared.show()
    this.http.post(this.config.url + 'api/contact_us', this.formData).map(res => res.json()).subscribe(data => {
      this.shared.hide();
      console.log(data);
      if (data.success = 1) {
        this.shared.showAlert('تم الارسال بنجاح');
      } else if (data.success = 0) {
        this.shared.showAlert(data.message);
      }

    }, error1 => {
      console.log(error1)
    });
  }
}
