import {Component, ViewChild} from '@angular/core';
import { Content, NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {ConfigProvider} from "../../providers/config/config";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  data: { [k: string]: any } = {};
  sendData: { [k: string]: any } = {};

  chats;
  chatsData;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              public shared: SharedDataProvider,
              public config: ConfigProvider) {

  }
  ionViewWillEnter() {
    this.data.customers_message_id =  this.navParams.get('customers_message_id');
    this.data.customers_name =  this.navParams.get('customers_name');
    this.getChat()
  }

  getChat() {
    this.shared.show()
    this.data.customers_id = this.shared.customerData.customers_id;
    console.log(this.data)
    this.http.post(this.config.url + 'api/view_chat_messages', this.data).map(res => res.json()).subscribe(data => {
      this.shared.hide()
      if (data.success == 1) {
        console.log("success");
        this.chats = Array.of(data);
        this.chatsData = this.chats[0].data;
        console.log(this.chatsData);
        this.scrollToBottom()
      }
      if (data.success == 0) {
        console.log("Fail")
        console.log(data.message)
      }
    });
  }
  sendMessage() {
    this.sendData.customers_id = this.shared.customerData.customers_id;
    this.sendData.customers_message_id =  this.navParams.get('customers_message_id');

    console.log(this.sendData)
    this.http.post(this.config.url + 'api/send_customer_message', this.sendData).map(res => res.json()).subscribe(data => {
      if (data.success == 1) {
        console.log("success");
        this.getChat();
        this.sendData.message = '';
        this.scrollToBottom()
      }
      if (data.success == 0) {
        console.log("Fail");
        console.log(data.message);
      }
    },error1 => {
      console.log(error1._body)
    });
  }
  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
      console.log("botton");
    }, 300);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

}
