import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ChatPage} from '../chat/chat';
import {NewchatPage} from './../newchat/newchat';
import {Http} from "@angular/http";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {ConfigProvider} from "../../providers/config/config";

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  public formData: { [k: string]: any } = {};
  messageData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
              public shared: SharedDataProvider,
              public config: ConfigProvider) {
    this.formData.customers_id = this.shared.customerData.customers_id;
    console.log(this.formData)
    this.shared.show()
    this.http.post(this.config.url + 'api/view_customer_message', this.formData).map(res => res.json()).subscribe(data => {
      this.shared.hide();
      this.messageData = data.data
      console.log(data);
    }, error1 => {
      console.log(error1)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

  formatDate(obj) {
    return obj.toString().replace(/-/g, "/");
  }

  openChatDetails(id, name) {
    this.navCtrl.push(ChatPage, {customers_message_id: id, customers_name: name});
  }

  openNew() {
    this.navCtrl.push(NewchatPage)
  }
}
