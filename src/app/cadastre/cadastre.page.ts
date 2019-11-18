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

  login: String = ""
  senha: String = ""
  confiSenha: String = ""
  email: string = ""
  instituicao: String = ""
  curso: String = ""
  usuarios: User[]
  nome: string = ""
  constructor(private provider: CadastrarUserService, public toastController: ToastController, private router: Router) { }

  ngOnInit() {
    this.provider.getAll().subscribe(res => {
      this.usuarios = res
    })
  }

  async cadastrar(){
    let confi = true
    
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
    
    

    let regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm
      
      
      if(this.email == "" || this.login == "" || this.curso == "" || this.instituicao == "" || this.senha == "" || this.nome == ""){
        confi = false
        toast.message = "Favor preeencha todos os campos"
        toast.present()
        return 
      }
      else if(!regEmail.test(this.email)){
        confi = false
        toast.message = 'Digite um e-mail válido'
        toast.present();
        return
      }
      else if(this.login.length < 5){
        confi = false
        toast.message = 'O login deve possuir no mínimo 5 caracteres'
        toast.present()
        return
      }
      else if(this.usuarios.find(x => x.login == this.login) != undefined){
        console.log("entrei aqui")
        confi = false
        toast.message = "Esse login já esta sendo usado por outro usuário"
        toast.present()
        return
      }
      else if(this.confiSenha != this.senha){
        confi = false
        toast.message = 'As senhas não conferem'
        toast.present();
        return
      }
      else if(confi){
        let conteudo : User = {
          login: this.login, 
          senha: this.senha, 
          email: this.email, 
          instituicao: this.instituicao,
          curso: this.curso,
          nome: this.nome
        }
        toast.message = 'Usuário salvo com sucesso.'
        this.provider.addUser(conteudo).then((res) => {
          toast.present();
          sessionStorage.setItem('idUser',res.id)
          this.router.navigate(["menu/calendar-home"]);
        })
      }
    
    

    
  }

}
