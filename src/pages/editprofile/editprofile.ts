import {Component} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {ConfigProvider} from "../../providers/config/config";
import {Http} from "@angular/http";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";

/**
 * Generated class for the EditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {
  myAccountData = {
    customers_name: '',
    customers_telephone: '',
    customers_email_address: '',
    oldPassword: '',
    newPassword: ''

  };
  errorMessage = '';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              public config: ConfigProvider,
              public shared: SharedDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

  ionViewWillEnter() {
    this.myAccountData.customers_name = this.shared.customerData.customers_name;
    this.myAccountData.customers_telephone = this.shared.customerData.customers_telephone;
  }

  //function updating user information
  updateInfo = function () {
    this.myAccountData.customers_email_address = this.shared.customerData.customers_email_address
    let currenrtPassword = this.myAccountData.oldPassword;
    let newPassword = this.myAccountData.newPassword;
    console.log(currenrtPassword + "  " + newPassword);
    console.log(this.shared.customerData.customers_password);
    if (newPassword != "" && currenrtPassword == "") {
      this.errorMessage = 'الرجاء إدخال كلمة المرور الحالية';
    }
    else if (currenrtPassword != "" && currenrtPassword != this.shared.customerData.customers_password) {
      this.errorMessage = 'الرجاء إدخال كلمة المرور الحالية بشكل صحيح';
    }
    else if (newPassword != undefined && newPassword != "" && currenrtPassword != this.shared.customerData.customers_password) {

      this.errorMessage = 'يرجى إدخال كلمة مرور جديدة';
    }
    else {
      this.shared.show()
      this.myAccountData.customers_id = this.shared.customerData.customers_id;

      var data = this.myAccountData;
       console.log("post data  "+JSON.stringify(data));
      this.http.post(this.config.url + 'updateCustomersInfo', data).map(res => res.json()).subscribe(data => {
          this.shared.hide();
          if (data.success == 1) {
            this.shared.showAlert(data.message);
            this.shared.customerData.customers_name = this.myAccountData.customers_name;
            this.shared.customerData.customers_telephone = this.myAccountData.customers_telephone;

            this.shared.login(this.shared.customerData);

            this.myAccountData.oldPassword = "";
            this.myAccountData.newPassword = "";
            this.errorMessage = "";

          }
          if (data.success == 0) {
            this.errorMessage = data.message;
          }
        }
        , error => {
          this.shared.hide();
          this.shared.showAlert("Error while Updating!");
        });
    }
  }

}
