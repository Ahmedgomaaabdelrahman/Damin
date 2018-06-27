import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {ConfigProvider} from "../../providers/config/config";
import {Http} from "@angular/http";
import {BalancePage} from "../balance/balance";

/**
 * Generated class for the CreateoperationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-createoperation',
  templateUrl: 'createoperation.html',
})
export class CreateoperationPage {
  selectOperation: any;
  formData = {
    customers_id: '',
    order_type: '',
    customers_type: '',
    order_telephone: '',
    order_description: '',
    order_price: '',
    order_days: '',
    order_file: ''
  };
  // profilePicture = '';
  isChecked = false;
  errorMessage = '';
  total: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              private camera: Camera,
              public shared: SharedDataProvider,
              public http: Http,
              public platform: Platform,
              public config: ConfigProvider,) {

    this.selectOperation = this.navParams.get('selectOperation');
    this.formData.customers_id = this.shared.customerData.customers_id;
    this.formData.order_type = this.selectOperation;
  }

  select(id) {
    this.formData.customers_type = id;
    console.log(this.formData)

  }

  checkMoney() {
    this.isChecked = true;
    this.shared.show()
    var customersId: { [k: string]: any } = {};
    customersId.customers_id = this.shared.customerData.customers_id;
    console.log(customersId)
    this.http.post(this.config.url + 'api/account_balance', customersId).map(res => res.json()).subscribe(data => {
      this.shared.hide();
      this.total = data.data.total;
      if (data.data.total != '') {
        console.log(data)
      }
      if (data.data.total == '0') {
        console.log(this.isChecked)
        this.isChecked = false;
        console.log(this.isChecked)
        this.navCtrl.push(BalancePage);
      }
    }, error1 => {
      this.shared.hide()
      console.log(error1)
    });
  }

  submitOrder() {
    console.log(this.shared.customerData.account_balance)
    console.log(this.isChecked);
    if (this.isChecked == false) {
      this.errorMessage = 'برجاء الضغط علي حقل التاكد من وجود رصيد كافي '
    }else if (this.shared.customerData.customers_telephone == this.formData.order_telephone) {
      this.errorMessage = 'لا يمكنك استخدام رقم الجوال الخاص بك'
    } else if (this.isChecked == true && this.shared.customerData.customers_telephone != this.formData.order_telephone) {
      this.shared.show()
      this.http.post(this.config.url + 'api/make_order', this.formData).map(res => res.json()).subscribe(data => {
        this.shared.hide()
        console.log(data)
        if (data.success == 1) {
          this.navCtrl.pop();
          this.shared.showAlert(data.message)
        }
        if (data.success == 0) {
          this.errorMessage = data.message
        }
      }, error1 => {
        this.shared.hide()
        console.log(error1)
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateoperationPage');
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'قم باختيار الصوره',
      buttons: [
        {
          text: 'اختيار صوره من المحمول',
          handler: () => {
            this.accessGallery();
          }
        },
        {
          text: 'استخدام الكاميرا',
          handler: () => {
            this.openCamera();
          }
        },
        {
          text: 'الغاء',
          role: 'cancel',
          handler: () => {
            console.log("Cancel upload")
          }
        }
      ]
    });
    actionSheet.present();
  }

  openCamera() {
    this.shared.show();
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 1000,
      targetHeight: 1000,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }
    this.platform.ready().then(() => {
      this.shared.hide();
      this.camera.getPicture(options).then((imageData) => {
        this.formData.order_file = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        console.log(err);
      });
    });
  }

  accessGallery() {
    this.shared.show();
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.shared.hide();
      this.formData.order_file = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      this.shared.hide();
      console.log(err);
    });
  }
}
