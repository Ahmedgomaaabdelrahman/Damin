import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {NewpasswoedPage} from '../newpasswoed/newpasswoed';
import {Http} from "@angular/http";
import {ConfigProvider} from "../../providers/config/config";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";

/**
 * Generated class for the CodeforgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-codeforget',
  templateUrl: 'codeforget.html',
})
export class CodeforgetPage {
  @ViewChild('passcode1') passcode1;
  @ViewChild('passcode2') passcode2;
  @ViewChild('passcode3') passcode3;
  @ViewChild('passcode4') passcode4;
  @ViewChild('passcode5') passcode5;
  @ViewChild('passcode6') passcode6;
  values: any = [];

  formData = {
    customers_email_address: '',
    key: ''
  };
  formDataRepeat = {
    customers_email_address: ''
  };
  errorMessage = '';

  constructor(public navCtrl: NavController,
              public shared: SharedDataProvider,
              public http: Http,
              public config: ConfigProvider,
              public navParams: NavParams,) {
    this.formData.customers_email_address = this.navParams.get('email');

  }
  onKeyUp(event, index) {
    console.log(event);
    if (event.target.value.length != 1) {
      this.setFocus(index - 2);
      this.values.pop();

    }else if(this.values.length == 5){
      this.values.push(event.target.value);
      this.setFocus(index);
      this.formData.key = this.values.toString().replace(/,/g, '');
      console.log('Form Key = ',this.formData.key);
      this.submit(event);
    }
    else {
      this.values.push(event.target.value);
      this.setFocus(index);
    }
    event.stopPropagation();
    console.log(this.values)
  }
  submit(e:Event){
    console.log('Form submit = ',this.formData.key)

    this.verfyCode();
    this.values=[];
    this.passcode1.value="";
    this.passcode2.value="";
    this.passcode3.value="";
    this.passcode4.value="";
    this.passcode5.value="";
    this.passcode6.value="";
    e.stopPropagation();

  }
  setFocus(index) {

    switch (index) {
      case 0:
        this.passcode1.setFocus();
        break;
      case 1:
        this.passcode2.setFocus();
        break;
      case 2:
        this.passcode3.setFocus();
        break;
      case 3:
        this.passcode4.setFocus();
        break;
      case 4:
        this.passcode5.setFocus();
        break;
      case 5:
        this.passcode6.setFocus();
        break;
    }
  }

  verfyCode() {
    this.shared.show();
    this.errorMessage = '';
    console.log('formData = ',this.formData);
    this.formData.customers_email_address = this.navParams.get('email');
    this.http.post(this.config.url + 'api/check_verification', this.formData).map(res => res.json()).subscribe(data => {
      this.shared.hide();
      console.log(data)
      if (data.success == 1) {
        this.navCtrl.push(NewpasswoedPage, {email: this.formData.customers_email_address});
      }
      if (data.success == 0) {
        this.errorMessage = data.message;
      }
    });
  }

  reSendCode() {
    this.shared.show();
    this.errorMessage = '';
    this.formDataRepeat.customers_email_address = this.formData.customers_email_address;
    console.log(this.formDataRepeat.customers_email_address);
    this.http.post(this.config.url + 'api/processForgotPassword', this.formDataRepeat).map(res => res.json()).subscribe(data => {
      if (data.success == 1) {
        console.log(data)
        this.shared.hide();
        this.shared.showAlert('تم ارسال الكود الي بريدك الالكتروني مرة اخري')
      }
      if (data.success == 0) {
        this.errorMessage = data.message;
      }
    });
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad CodeforgetPage');
  }

  // gopass(){
  //   this.navCtrl.push(NewpasswoedPage);
  // }
  back() {
    this.navCtrl.pop();
  }

}
