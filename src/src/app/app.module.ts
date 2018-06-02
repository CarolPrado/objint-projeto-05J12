import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { IndexPage } from '../pages/index';
import { MenuLateralPage } from '../pages/menu-lateral/menu-lateral';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PlantaService } from '../services/planta.service';
import { ApiService } from '../services/api.service';
import { ResponseService } from '../services/response.service';

@NgModule({
  declarations: [
    MyApp,
    IndexPage,
    MenuLateralPage,
    DashboardPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IndexPage,
    MenuLateralPage,
    DashboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlantaService,
	ApiService,
    ResponseService,
    DashboardPage
  ]
})
export class AppModule {}
