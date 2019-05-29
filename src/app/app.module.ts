import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ResumoService } from './resumo.service';
import { QuizService } from './quiz.service';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Toast } from '@ionic-native/toast/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,  
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyB2QuPU2P-uacuDhWwbanldt0o4N8jEdMM",
      authDomain: "teste-tcc-3363f.firebaseapp.com",
      databaseURL: "https://teste-tcc-3363f.firebaseio.com",
      projectId: "teste-tcc-3363f",
      storageBucket: "teste-tcc-3363f.appspot.com",
      messagingSenderId: "1059435639373"
  }),
  AngularFirestoreModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ResumoService,
    Toast,
    Camera,
    QuizService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
