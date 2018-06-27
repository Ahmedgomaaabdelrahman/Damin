import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AcceptoperationPage } from './../acceptoperation/acceptoperation';
import { EditoperationPage } from './../editoperation/editoperation';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the NotifyOperationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notify-operation',
  templateUrl: 'notify-operation.html',
})
export class NotifyOperationPage {
  refuse: any ;
  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotifyOperationPage');
  } 


  refuseOperation(){
    this.refuse = !this.refuse;
  }
  accept(){
    this.navCtrl.push(AcceptoperationPage);
  }

  edit(){
    this.navCtrl.push(EditoperationPage);
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
      
        }
      ]
    });
    alert.present();
  }
}
