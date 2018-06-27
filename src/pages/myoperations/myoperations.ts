import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {OperationstatusPage} from './../operationstatus/operationstatus';
import {OperationdetailsPage} from './../operationdetails/operationdetails';
import {CreateoperationPage} from './../createoperation/createoperation';
import {HomePage} from "../home/home";
import {ConfigProvider} from "../../providers/config/config";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {Http} from "@angular/http";

/**
 * Generated class for the MyoperationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-myoperations',
  templateUrl: 'myoperations.html',
})
export class MyoperationsPage {
  chosFlag: boolean = false;
  addFlag: boolean = false;
  public formData: { [k: string]: any } = {};
  operations: any;
  rate: any;
  dataOrder: any;
  errorMessage = '';
  selectOperation: any;
  success: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: Http,
              public shared: SharedDataProvider,
              public config: ConfigProvider) {
    this.formData.customers_id = this.shared.customerData.customers_id;
    console.log(this.formData)
    this.shared.show()
    this.http.post(this.config.url + 'api/listingOrders', this.formData).map(res => res.json()).subscribe(data => {
      this.shared.hide()
      console.log(data)
      this.dataOrder = data;
      this.success = data.success;
      if (this.success == 1) {
        this.operations = data.data;
        this.rate = data.rate;
        console.log('Rate = ', this.rate)
        console.log(this.operations)
      } else if (this.success == 0) {
        this.rate = 0;
      }

    }, error1 => {
      console.log(error1)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyoperationsPage');
    this.chosFlag = false;
    this.addFlag = false;
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad MyoperationsPage');
    this.chosFlag = false;
    this.addFlag = false;
  }

  operationStats(item) {
    this.navCtrl.push(OperationstatusPage, {order: item});
  }

  openDetails(item) {
    this.navCtrl.push(OperationdetailsPage, {order: item});
  }

  openChos() {
    this.chosFlag = !this.chosFlag;
  }

  changeImg(id) {
    this.addFlag = true;
    console.log(this.addFlag);
    this.selectOperation = id;
  }

  opennew() {
    this.navCtrl.push(CreateoperationPage, {selectOperation: this.selectOperation});
  }

  formatDate(obj) {
    return obj.toString().replace(/-/g, "/");
  }
}
