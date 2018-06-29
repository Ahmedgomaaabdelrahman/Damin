import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {Http} from "@angular/http";
import {ConfigProvider} from "../../providers/config/config";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";

/**
 * Generated class for the PagesContainerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pages-container',
  templateUrl: 'pages-container.html',
})
export class PagesContainerPage {
  body: any;
  title: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: Http,
              public shared: SharedDataProvider,
              private photoViewer: PhotoViewer,
              public config: ConfigProvider) {
    this.http.post(this.config.url + 'api/pagesDetails', {page_id: this.navParams.get('id')}).map(res => res.json()).subscribe(data => {
      this.shared.hide();
      console.log(data);
      if (data.success = 1) {
        this.body = data.data[0].body;
        this.title = data.data[0].title;
        console.log(this.body);

      } else if (data.success = 0) {
        this.shared.showAlert(data.message);
      }
    }, error1 => {
      console.log(error1)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesContainerPage');
  }

}
