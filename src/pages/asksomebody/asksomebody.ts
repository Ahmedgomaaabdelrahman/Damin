import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";
import {SharedDataProvider} from "../../providers/shared-data/shared-data";
import {ConfigProvider} from "../../providers/config/config";


@Component({
  selector: 'page-asksomebody',
  templateUrl: 'asksomebody.html',
})
export class AsksomebodyPage {
  search;
  searchResult:any;
  searchResultData:any;
  found: boolean;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public shared: SharedDataProvider,
              public config: ConfigProvider,
              public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AsksomebodyPage');
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
      this.shared.show();
      console.log(this.search)
      this.http.post(this.config.url + 'api/getRateByNumber', {'customers_telephone': this.search}).map(res => res.json()).subscribe(data => {
        this.shared.hide();
        console.log(data)
        if (data.success == 1) {
          // this.searchResult = data.data.result;
          // console.log(this.searchResult);
          this.searchResult = Array.of(data.data);
          console.log(this.searchResult)
          for (let items of this.searchResult) {
            this.searchResultData = Array.of(items.result);
            console.log(this.searchResultData)
          }
          this.found = true
        }
        if (data.success == 0) {
          this.found = false
        }
      });
  };
}
