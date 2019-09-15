import { Component, OnInit } from '@angular/core';
import {sala, horariosAulas,SalaAulaService} from '../services/sala-aula.service'
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router/';
import { ActivatedRoute } from '@angular/router/src/router_state';


@Component({
  selector: 'app-sala-aula',
  templateUrl: './sala-aula.page.html',
  styleUrls: ['./sala-aula.page.scss'],
})
export class SalaAulaPage implements OnInit {
  salasP : sala[]
  salasT : sala[]
  salitas: sala[]
  idUser = sessionStorage.getItem('idUser')
  semNada = false
  constructor(private provider: SalaAulaService, public router :Router,
     public toastController: ToastController, public alertController: AlertController) { }

  ngOnInit() {
    
    console.log(this.idUser)

    this.provider.getAll().subscribe(res => {
      this.salitas = res
      
      this.salasP = this.salitas.filter(x => {
        if(x.adm == this.idUser || (x.integrantes != undefined && x.integrantes.find(y => y == this.idUser))){
          return x
        }
      })
      
      this.todasSalasSemUsuario()
      
      
    })
  }

  seInscrever(obj){
    //por favor de certo!
    
    if(obj.integrantes == undefined){
      obj.integrantes = [this.idUser]
    }
    else if(!obj.integrantes.find(x => x == this.idUser)){
      obj.integrantes.push(this.idUser) 
    }
    
    this.provider.update(obj.id, obj)

  }

  async sair(obj){
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: 'Tem certeza que deseja sair da sala de aula ' + obj.descricao + "?",
      buttons: [
        {
          text: 'Sim',
          cssClass: 'secondary',
          handler: (action) => {
            this.confirmadoSair(obj)
          }
        }, {
          text: 'Cancelar',
          cssClass: "primary",
          role: "cancel",
          handler: () => {
            console.log('cancel');
          }
        }
      ]
    });

    await alert.present();
    
  }

  confirmadoSair(obj){
    if(obj.adm == this.idUser){
      if(obj.integrantes.length == 0){
        this.provider.delete(obj.id)
        return 0
      }
      else{
        obj.adm = obj.integrantes[0]
        obj.integrantes.splice(0,1)
      }
    }
    else if(obj.integrantes.length > 0){
      obj.integrantes = obj.integrantes.filter(x => x != this.idUser)
      if(obj.monitores){
        if(obj.monitores.find(x => x == this.idUser)){
          obj.monitores = obj.monitores.filter(x => x != this.idUser)
        }
      }
      if(obj.solicitacao){
        if(obj.solicitacao.find(x => x == this.idUser)){
          obj.solicitacao = obj.solicitacao.filter(x => x != this.idUser)
        }
      }
    }

    
    this.provider.update(obj.id, obj)
  }

  async delete(obj){
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: 'Tem certeza que deseja excluir a sala de aula ' + obj.descricao + "?",
      buttons: [
        {
          text: 'Sim',
          cssClass: 'secondary',
          handler: (action) => {
            this.provider.delete(obj.id)
          }
        }, {
          text: 'Cancelar',
          cssClass: "primary",
          role: "cancel",
          handler: () => {
            console.log('cancel');
          }
        }
      ]
    });

    await alert.present();
  }

  edit(obj){
    this.router.navigate(["sala-insert", obj.id])
  }

  todasSalasSemUsuario(){
    this.salasT = this.salitas.filter(x => {
      if(x.adm != this.idUser && (x.integrantes == undefined || !x.integrantes.find(y => y == this.idUser))){
        return x
      }
    })

    this.salasT.sort((a,b) => {
      if(a.universidade == b.universidade){
        return 0
      }
      return (a.universidade > b.universidade ? -1 : 1 )
    })
  }

  pesquisar(ev){
    if(ev.target.value == ""){
      this.todasSalasSemUsuario()
    }
    else{
      this.salasT = this.salitas.filter(x => {
        return x.descricao.indexOf(ev.target.value) >=0 && x.adm != this.idUser && !x.integrantes.find(y => y == this.idUser) 
      })
    }
    
  }
  scanCode(){
    
  }
  
  redirectSala(adm, id, integrantes){
    sessionStorage.setItem('adm', (this.idUser == adm || (integrantes != undefined && integrantes.find(x => x == this.idUser)) ? 'sim' : 'nao'))
    this.router.navigate(["/menu-sala/resumo/", id])

  }
}
