import { Component, OnInit } from '@angular/core';
import {User, LoginServiceService} from '../services/login-service.service'
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router/';
import { ActivatedRoute } from '@angular/router/src/router_state';

@Component({
  selector: 'app-user-perfil',
  templateUrl: './user-perfil.page.html',
  styleUrls: ['./user-perfil.page.scss'],
})
export class UserPerfilPage implements OnInit {
  idUser = sessionStorage.getItem('idUser')
  user : User
  edit : boolean = false
  constructor(private provider : LoginServiceService, private toastController: ToastController ) { }

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

}
