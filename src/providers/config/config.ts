import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {
  public url: string = 'http://hefny.me/test/damin/api/';

  constructor(public http: Http) {
    console.log('Hello ConfigProvider Provider');
  }

}
