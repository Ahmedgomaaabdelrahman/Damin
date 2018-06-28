import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { ActivationcodePage } from '../pages/activationcode/activationcode';
import { CodeforgetPage } from '../pages/codeforget/codeforget';
import { LoginPage } from '../pages/login/login';
import { NewpasswoedPage } from '../pages/newpasswoed/newpasswoed';
import { SignupPage } from '../pages/signup/signup';
import { ForgetpassPage } from '../pages/forgetpass/forgetpass';

import { MyoperationsPage } from '../pages/myoperations/myoperations';
import { CreateoperationPage } from '../pages/createoperation/createoperation';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { MessagesPage } from '../pages/messages/messages';
import { NewchatPage } from '../pages/newchat/newchat';
import { ProfilePage } from '../pages/profile/profile';
import { OperationstatusPage } from '../pages/operationstatus/operationstatus';
import { OperationdetailsPage } from '../pages/operationdetails/operationdetails';
import { YellowheaderComponent } from '../components/yellowheader/yellowheader';
import { ChatPage } from '../pages/chat/chat';
import { ConfigProvider } from '../providers/config/config';
import { SharedDataProvider } from '../providers/shared-data/shared-data';
import {HttpModule} from "@angular/http";
import {IonicStorageModule} from "@ionic/storage";
import {Camera} from "@ionic-native/camera";
import {Transfer} from "@ionic-native/transfer";
import {FilePath} from "@ionic-native/file-path";
import {File} from "@ionic-native/file";
import { MyratingsPage } from '../pages/myratings/myratings';
import { NotificationsPage } from '../pages/notifications/notifications';
import { AsksomebodyPage } from '../pages/asksomebody/asksomebody';
import { BalancePage } from '../pages/balance/balance';
import { AddBalancePage } from '../pages/add-balance/add-balance';
import { SettingsPage } from '../pages/settings/settings';
import { ContactusPage } from '../pages/contactus/contactus';
import { DamindetailsPage } from '../pages/damindetails/damindetails';
import { BankaccountsPage } from '../pages/bankaccounts/bankaccounts';
import { AddbankaccountPage } from '../pages/addbankaccount/addbankaccount';
import { NotifyOperationPage } from '../pages/notify-operation/notify-operation';
import { AcceptoperationPage } from '../pages/acceptoperation/acceptoperation';
import { BanktransferPage } from '../pages/banktransfer/banktransfer';
import {FileTransfer} from "@ionic-native/file-transfer";
import {FileChooser} from "@ionic-native/file-chooser";
import {Network} from "@ionic-native/network";
import {NoInternetPage} from "../pages/no-internet/no-internet";
import { EditoperationPage } from '../pages/editoperation/editoperation';
import {PhotoViewer} from "@ionic-native/photo-viewer";
import { TaqeeemPage } from '../pages/taqeeem/taqeeem';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WelcomePage,
    ActivationcodePage,
    CodeforgetPage,
    LoginPage,
    NewpasswoedPage,
    SignupPage,
    ForgetpassPage,
    MyoperationsPage,
    CreateoperationPage,
    EditprofilePage,
    MessagesPage,
    NewchatPage,
    ProfilePage,
    OperationstatusPage,
    OperationdetailsPage,
    YellowheaderComponent,
    ChatPage,
    MyratingsPage,
    NotificationsPage,
    AsksomebodyPage,
    BalancePage,
    AddBalancePage,
    SettingsPage,
    ContactusPage,
    DamindetailsPage,
    BankaccountsPage,
    AddbankaccountPage,
    NotifyOperationPage,
    AcceptoperationPage,
    BanktransferPage,
    NoInternetPage,
    EditoperationPage,
    TaqeeemPage
  ],
  imports: [

BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{
      scrollPadding: false,
      scrollAssist: false
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
    ActivationcodePage,
    CodeforgetPage,
    LoginPage,
    NewpasswoedPage,
    SignupPage,
    ForgetpassPage,
    MyoperationsPage,
    CreateoperationPage,
    EditprofilePage,
    MessagesPage,
    NewchatPage,
    ProfilePage,
    OperationstatusPage,
    OperationdetailsPage,
    YellowheaderComponent,
    ChatPage,
    MyratingsPage,
    NotificationsPage,
    AsksomebodyPage,
    BalancePage,
    AddBalancePage,
    SettingsPage,
    ContactusPage,
    DamindetailsPage,
    BankaccountsPage,
    AddbankaccountPage,
    NotifyOperationPage,
    AcceptoperationPage,
    BanktransferPage,
    NoInternetPage,
    EditoperationPage,
    TaqeeemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigProvider,
    SharedDataProvider,
    Camera,
    File,
    Transfer,
    FilePath,
    FileTransfer,
    FileChooser,
    Network,
    PhotoViewer
  ]
})
export class AppModule {}
