import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Config, ConfigUserService } from '../services/config-user.service'
import * as moment from "moment"; 
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-configurar-notificacao',
  templateUrl: './configurar-notificacao.page.html',
  styleUrls: ['./configurar-notificacao.page.scss'],
})
export class ConfigurarNotificacaoPage implements OnInit {
  idUser = sessionStorage.getItem('idUser')
  qtdDias : number = 1
  permiteNoti = "true"
  dados : Config[]
  insert : Config
  editando : boolean = false
  id : string

  constructor(
    private provider : ConfigUserService, 
    private toastController: ToastController, 
    private modalController : ModalController) { }

  ngOnInit() {
    this.provider.getAll().subscribe(res => {
      this.dados = res

      let dados = this.dados.filter(x => x.idUser == this.idUser)
      this.insert = dados[0]
      console.log(this.insert)
      if(this.insert != undefined){
        this.editando = true
        this.qtdDias = this.insert.qtdDias
        this.permiteNoti = this.insert.permite
        this.id = this.insert.id
      }


    })
  }

  mostrarNotificacao(){

  }

  async salvarConfig(){
    const toast = await this.toastController.create({
      duration: 5000,
      message: 'Configuração salva com sucesso!',
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
    let conteudo = {
      qtdDias : this.qtdDias,
      idUser : this.idUser,
      permite: this.permiteNoti
    }
    if(isNaN(this.qtdDias) ){
      toast.message = "Dia deve ser valor numerico"
      toast.present()
      return
    }
    else if(this.qtdDias.toString() == ""){
      toast.message = "Dia deve ser valor numerico"
      toast.present()
      return
    }
    if(this.editando){
      this.provider.update(this.insert.id, conteudo).then(res => {
        toast.present()
      })
    }
    else{
      this.provider.addUser(conteudo).then(res => {
        toast.present()
      })
    }
    
  }
  fecharModal() {
    this.modalController.dismiss();
  }
}
