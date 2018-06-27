import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {ConfigProvider} from "../../providers/config/config";
import {Http} from "@angular/http";
import {ChatPage} from "../chat/chat";

/**
 * Generated class for the NewchatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-newchat',
  templateUrl: 'newchat.html',
})
export class NewchatPage {
  search;
  searchResult = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public shared: SharedDataProvider,
              public config: ConfigProvider,
              public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewchatPage');
  }

  onChangeKeyword = function (e) {
    //console.log(this.search);
    // if (search != undefined) {
    //rchResult = [];
    //  }
  }
  getSearchData = function () {

    if (this.search != undefined) {
      if (this.search == null || this.search == '') {
        this.shared.showAlert("من فضلك ادخل رقم جوال ");
        return 0;
      }
    } else {
      this.shared.showAlert("من فضلك ادخل رقم جوال ");
      return 0;
    }
    if (this.search == this.shared.customerData.customers_telephone) {
      this.shared.showAlert("لا يمكنك البحث عن رقم جوالك ");
    } else {
      this.shared.show();
      console.log(this.search)
      this.http.post(this.config.url + 'api/checkCustomers', {'customers_telephone': this.search}).map(res => res.json()).subscribe(data => {
        this.shared.hide();
        console.log(data)
        if (data.success == 1) {
          this.searchResult = data.data;
        }
        if (data.success == 0) {
          this.shared.showAlert(data.message);
        }
      });
    }
  };

  openChatDetails(id, name) {
    this.navCtrl.push(ChatPage, {customers_message_id: id, customers_name: name});
  }
}
