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
    ChatPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
