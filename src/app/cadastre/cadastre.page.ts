import { Component, OnInit } from '@angular/core';
import {CadastrarUserService, User } from './../services/cadastrar-user.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastre',
  templateUrl: './cadastre.page.html',
  styleUrls: ['./cadastre.page.scss'],
})

export class CadastrePage implements OnInit {

  login: String
  senha: String
  confiSenha: String
  email: string
  instituicao: String
  curso: String
  constructor(private provider: CadastrarUserService, public toastController: ToastController) { }

  ngOnInit() {
  }

  async cadastrar(){
    let confi = true
    let regEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    const toast = await this.toastController.create({
      message: '',
      duration: 5000,
      buttons: [
        {
          text: 'Ok',
          role: 'ok',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    if(regEmail.test(this.email)){
      confi = false
      toast.message = 'Digite um e-mail válido'
      toast.present();
    }
    else if(this.confiSenha != this.senha){
      confi = false
      toast.message = 'As senhas não conferem'
      toast.present();
    }
    else if(confi){
      let conteudo : User = {
        login: this.login, 
        senha: this.senha, 
        email: this.email, 
        instituicao: this.instituicao,
        curso: this.curso
      }
      toast.message = 'Usuário salvo com sucesso.'
      this.provider.addUser(conteudo).then(() => {
        toast.present();
      })
    }

    
  }

}
