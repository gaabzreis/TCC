import { Component, OnInit } from '@angular/core';
import { forum, resp, ForumServiceService } from './../services/forum-service.service';
import { ActivatedRoute } from '@angular/router/';
import { ToastController } from '@ionic/angular/';
import { Router } from '@angular/router';
import {sala, SalaAulaService} from '../services/sala-aula.service'
import {User, LoginServiceService} from '../services/login-service.service'

@Component({
  selector: 'app-forum-insert',
  templateUrl: './forum-insert.page.html',
  styleUrls: ['./forum-insert.page.scss'],
})
export class ForumInsertPage implements OnInit {

  idSala = this.router.snapshot.params["sala-aula"]
  idUser = sessionStorage.getItem('idUser')
  forum : forum
  pergunta: string = ""
  usuario: User
  sala : sala
  constructor(private provider : ForumServiceService, private router : ActivatedRoute, 
    private toastController : ToastController, private rout : Router, private userProvider : LoginServiceService,
    private salaProvider : SalaAulaService) { }

  ngOnInit() {
    this.userProvider.getByFilter(this.idUser).subscribe(res => {
      this.usuario = res
    })

    this.salaProvider.getByFilter(this.idSala).subscribe(res => {
      this.sala = res
    })
  }

  async salvar(){
    const toast = await this.toastController.create({
      message: 'Pergunta registrada com sucesso.',
      buttons: [
        {
          text: 'Ok',
          role: "cancel"
        }
      ]
    });
    if(this.pergunta == ""){
      toast.message = "Por favor, preencha o campo pergunta"
      toast.present()
      return
    }
    
    this.forum = {pergunta: this.pergunta, idSala : this.idSala, criador : this.idUser}
    
    this.provider.addForum(this.forum).then(res => {
      console.log(this.usuario)
      
      if(this.usuario.pontos == undefined){
        this.usuario.pontos = 0
      }
      this.usuario.pontos += 2
      let usuarioSala = this.sala.integrantes.filter(x => x.idIntegrante == this.idUser)
      console.log(usuarioSala[0])
      usuarioSala[0].pontos += 2

      this.userProvider.update(this.idUser, this.usuario)
      this.salaProvider.update(this.idSala, this.sala)
      toast.present()
      this.rout.navigate(["menu-sala/forum", this.idSala])
    })
    
  }

}
