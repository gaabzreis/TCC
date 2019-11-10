import { Component, OnInit } from '@angular/core';
import {User, LoginServiceService} from '../services/login-service.service'
import { ToastController, AlertController, Platform, ModalController } from '@ionic/angular';
import { Router } from '@angular/router/';
import { ActivatedRoute } from '@angular/router/src/router_state';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx'
import { ConfigurarNotificacaoPage } from '../configurar-notificacao/configurar-notificacao.page';

@Component({
  selector: 'app-user-perfil',
  templateUrl: './user-perfil.page.html',
  styleUrls: ['./user-perfil.page.scss'],
})
export class UserPerfilPage implements OnInit {
  idUser = sessionStorage.getItem('idUser')
  user : User
  edit : boolean = false
  constructor(private provider : LoginServiceService, 
              private toastController: ToastController,
              private localnotification : LocalNotifications,
              private plt : Platform,
              private modalController: ModalController ) { 
                this.plt.ready().then(() => {
                  this.localnotification.on('click').subscribe(res => {
                    let msg = res.data ? res.data.mydata : '';
                  })
                  this.localnotification.on('trigger').subscribe(res => {
                    let msg = res.data ? res.data.mydata : '';
                  })
                })
              }

  ngOnInit() {
    this.provider.getByFilter(this.idUser).subscribe(res => {
      this.user = res
      
    })
  }

  async editar(){
    if(!this.edit){
      this.edit = true
      return
    }
    else{
      const toast = await this.toastController.create({
        duration: 5000,
        message: 'Usuário editado com sucesso!',
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
      this.provider.update(this.idUser, this.user).then(suc => {
        toast.present()
      })
      
    }
    
    console.log(this.edit)
  }

  async abrirNotificacao(){

      const modal = await this.modalController.create({
        component: ConfigurarNotificacaoPage
      });
  
      modal.onDidDismiss()
        .then((data) => {
          const user = data['data']; 
      });
  
      return await modal.present();
    
    /* this.localnotification.schedule({
      id: 42,
      title: "Bom dia",
      text: "OGGG",
      trigger: {
        every: {
          hour: 20, minute: 32
        }
      }
    }) */
  }

}
