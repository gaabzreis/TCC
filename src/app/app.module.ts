import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Toast } from '@ionic-native/toast/ngx';

import { NovaAtividadePageModule } from './kanban/nova-atividade/nova-atividade.module';
import { ConfigurarNotificacaoPageModule } from './configurar-notificacao/configurar-notificacao.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { QRCodeModule } from 'angularx-qrcode';

import { FormsModule } from '@angular/forms';
import {IonicGestureConfig} from "./gestures/ionic-gesture-config";
import { File } from '@ionic-native/file/ngx'

/* import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/'; */

import { LocalNotifications } from '@ionic-native/local-notifications/ngx'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [FormsModule, BrowserModule, IonicModule.forRoot(),QRCodeModule, AppRoutingModule, NovaAtividadePageModule, ConfigurarNotificacaoPageModule, 
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyB2QuPU2P-uacuDhWwbanldt0o4N8jEdMM",
      authDomain: "teste-tcc-3363f.firebaseapp.com",
      databaseURL: "https://teste-tcc-3363f.firebaseio.com",
      projectId: "teste-tcc-3363f",
      storageBucket: "teste-tcc-3363f.appspot.com",
      messagingSenderId: "1059435639373"
    }),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: IonicGestureConfig
  },
    Toast,
    Camera,
    BarcodeScanner,
    File,
    LocalNotifications
    
  ],
  bootstrap: [AppComponent],
 
})
export class AppModule {}
