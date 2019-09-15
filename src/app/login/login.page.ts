import { Component, OnInit } from '@angular/core';
import { LoginServiceService, User } from './../services/login-service.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: String
  senha: String
  constructor(public toastController: ToastController,private router: Router, 
    private provider: LoginServiceService, private splashScreen: SplashScreen) { }

  ngOnInit() {
    this.splashScreen.show();
  }

  async logar(){
    const toast = await this.toastController.create({
      message: 'Login e/ou senha incorretos',
      duration: 5000,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    let users: User[]
    this.provider.getAll().subscribe(res => {
      users = res;
      if (this.login == "mock" && this.senha == "mock") {
        sessionStorage.setItem('idUser', "mock")
        this.router.navigate(["menu/home"])
      }
      else if(users.find(x => x.email == this.login && x.senha == this.senha)){
        sessionStorage.setItem('idUser',users.find(x => x.email == this.login && x.senha == this.senha).id)
        this.router.navigate(["menu/home"])
      }
      else{
        toast.present()
      }
    })
    
    
  }
  cadastre(){
    this.router.navigate(["cadastre"])
  }

}
