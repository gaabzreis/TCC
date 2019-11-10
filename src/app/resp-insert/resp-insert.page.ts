import { Component, OnInit } from '@angular/core';
import { forum, resp, ForumServiceService } from '../services/forum-service.service'
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular/';
import { Router } from '@angular/router';
import {sala, SalaAulaService} from '../services/sala-aula.service'
import {User, LoginServiceService} from '../services/login-service.service'

@Component({
  selector: 'app-resp-insert',
  templateUrl: './resp-insert.page.html',
  styleUrls: ['./resp-insert.page.scss'],
})
export class RespInsertPage implements OnInit {
  resp : resp 
  forum : forum
  idForum = this.rout.snapshot.params['idForum']
  resposta: string = ""
  idUser = sessionStorage.getItem('idUser')
  usuario : User
  sala : sala
  constructor(private router : Router, 
              private rout: ActivatedRoute, 
              private provider : ForumServiceService, 
              public toastController: ToastController,
              private userProvider : LoginServiceService,
              private salaProvider : SalaAulaService) { }

  ngOnInit() {
    this.provider.getByFilter(this.idForum).subscribe(res => {
      this.forum = res
      this.salaProvider.getByFilter(this.forum.idSala).subscribe(res => {
        this.sala = res
      })
    })
    this.userProvider.getByFilter(this.idUser).subscribe(res => {
      this.usuario = res
    })
   
  }

  async salvar(){
    const toast = await this.toastController.create({
      message: 'Resposta salva com sucesso.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            
          }
        }
      ]
    });
    if(this.resposta == ""){
      toast.message = "Preencha todos os campos"
      toast.present()
      return 
    }
    this.resp = {resposta: this.resposta, likes: 0, criador: this.idUser}
    if(this.forum.respostas == undefined){
      this.forum.respostas = [this.resp]
    }
    else{
      this.forum.respostas.push(this.resp)
    }
    
    this.provider.updateForum(this.idForum, this.forum).then(res => {
      if(this.usuario.pontos == undefined){
        this.usuario.pontos = 0
      }
      this.usuario.pontos += 5
      let salaUser = this.sala.integrantes.filter(x => x.idIntegrante == this.idUser)
      salaUser[0].pontos += 5
      this.salaProvider.update(this.forum.idSala, this.sala)
      this.userProvider.update(this.idUser, this.usuario)
      toast.present()
      this.router.navigate(["forum-list", this.idForum])
    })
  }



}
