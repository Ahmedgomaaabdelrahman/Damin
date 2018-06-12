import {Component} from '@angular/core';
import {ActionSheetController, NavController, NavParams, Platform} from 'ionic-angular';
import {ConfigProvider} from "../../providers/config/config";
import {Http} from "@angular/http";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {Camera, CameraOptions} from '@ionic-native/camera';

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
    oldPassword: '',
    newPassword: '',
    customers_old_picture: ''
  };
  errorMessage = '';
  profilePicture = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              public config: ConfigProvider,
              public platform: Platform,
              public actionSheetCtrl: ActionSheetController,
              private camera: Camera,
              public shared: SharedDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

  ionViewWillEnter() {
    this.myAccountData.customers_name = this.shared.customerData.customers_name;
    this.profilePicture = this.config.url + this.shared.customerData.customers_picture;
    this.myAccountData.customers_old_picture = this.shared.customerData.customers_picture;
  }

  //function updating user information
  updateInfo = function () {
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

      if (this.profilePicture == this.config.url + this.shared.customerData.customers_picture) { //console.log("old picture");
        // this.myAccountData.customers_picture=$rootScope.customerData.customers_picture;
        this.myAccountData.customers_old_picture = this.shared.customerData.customers_picture;
      }
      else if (this.profilePicture == '')
        this.myAccountData.customers_picture = null;
      else
        this.myAccountData.customers_picture = this.profilePicture;

      var data = this.myAccountData;
      console.log("post data  " + JSON.stringify(data));
      this.http.post(this.config.url + 'api/updateCustomersInfo', data).map(res => res.json()).subscribe(data => {
          this.shared.hide();
          if (data.success == 1) {
            console.log('Data = ',data)
            this.shared.showAlert(data.message);
            this.shared.customerData.customers_name = this.myAccountData.customers_name;
            this.shared.customerData.customers_picture = data.data[0].customers_picture;
            // this.shared.customerData.customers_telephone = this.myAccountData.customers_telephone;

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
    this.shared.autoHide(1000);
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
      this.camera.getPicture(options).then((imageData) => {
        this.profilePicture = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
      });
    });
  }
  accessGallery(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.profilePicture = 'data:image/jpeg;base64,'+imageData;
    }, (err) => {
      console.log(err);
    });
  }
}
