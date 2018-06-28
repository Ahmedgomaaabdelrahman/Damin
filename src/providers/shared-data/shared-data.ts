import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {ConfigProvider} from "../config/config";
import {Http} from "@angular/http";
import {AlertController, LoadingController, MenuController} from "ionic-angular";
import {Storage} from "@ionic/storage";

/*
  Generated class for the SharedDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedDataProvider {
  public customerData: { [k: string]: any } = {};
  okText = "موافق";
  alertText = "تنبية";
  loading;

  constructor(public config: ConfigProvider,
              public loadingCtrl: LoadingController,
              public http: Http,
              public alertCtrl: AlertController,
              public menuCtrl: MenuController,
              private storage: Storage) {
    console.log('Hello SharedDataProvider Provider');
    //get data from local
    storage.get('customerData').then((val) => {
      if (val != null || val != undefined) this.customerData = val;
    });
  }

  login(data) {
    this.customerData = data;
    console.log('login', this.customerData)
    this.storage.set('customerData', this.customerData);
    this.menuCtrl.enable(true, 'myMenu');
  }

  logOut() {
    this.menuCtrl.enable(false, 'myMenu');
    this.autoHide(500);
    this.customerData = {};
    this.storage.set('customerData', this.customerData);
  }

  autoHide(time) {
    this.loading = this.loadingCtrl.create({
      duration: time
    });
    this.loading.present();
  }

  show() {
    this.loading = this.loadingCtrl.create({
      duration: 10000
    });
    this.loading.present();
  }

  showAlert(text) {
    let alert = this.alertCtrl.create({
      title: this.alertText,
      subTitle: text,
      buttons: [this.okText]
    });
    alert.present();
  }

  hide() {
    try {
      this.loading.dismiss();
    } catch (error) {
    }
  }
}
