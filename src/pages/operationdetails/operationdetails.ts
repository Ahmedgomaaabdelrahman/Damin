import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {ConfigProvider} from "../../providers/config/config";

/**
 * Generated class for the OperationdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-operationdetails',
  templateUrl: 'operationdetails.html',
})
export class OperationdetailsPage {
  childOrder: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public shared: SharedDataProvider,private photoViewer: PhotoViewer,public config: ConfigProvider) {
    this.childOrder = this.navParams.get('order');
    console.log(this.childOrder)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OperationdetailsPage');
  }
  formatDate(obj) {
    return obj.toString().replace(/-/g, "/");
  }
  preview(id){
    this.photoViewer.show(this.config.url + id);
  }
}
