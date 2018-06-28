import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {ConfigProvider} from "../../providers/config/config";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {Http} from "@angular/http";

/**
 * Generated class for the AddBalancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-add-balance',
  templateUrl: 'add-balance.html',
})
export class AddBalancePage {
  formData = {
    customers_id: '',
    customers_name: '',
    bank_name: '',
    account_num: '',
    price: '',
    image: ''
  };
  bankInfo: any;
  errorMessage: '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              private camera: Camera,
              public shared: SharedDataProvider,
              public http: Http,
              public platform: Platform,
              public config: ConfigProvider,) {
    this.shared.show();
    this.formData.customers_id = this.shared.customerData.customers_id;
    this.http.post(this.config.url + 'api/getCustomerBanks', this.formData).map(res => res.json()).subscribe(data => {
      this.shared.hide();
      if (data.success == 1) {
        console.log(data);
        this.bankInfo = data.data;
      }
      if (data.success == 0) {
        console.log(data)
      }
    }, error1 => {
      console.log(error1)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBalancePage');
  }

  select(id) {
    this.formData.bank_name = id;
    console.log(this.formData)
  }

  addMoney() {
    this.shared.show()
    this.http.post(this.config.url + 'api/account_recharge', this.formData).map(res => res.json()).subscribe(data => {
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
        this.formData.image = 'data:image/jpeg;base64,' + imageData;
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
      this.formData.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      this.shared.hide();
      console.log(err);
    });
  }
}
