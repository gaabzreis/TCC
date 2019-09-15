import { Component, OnInit } from '@angular/core';
import { forum, resp, ForumServiceService } from './../services/forum-service.service';
import { ActivatedRoute } from '@angular/router/';
import { ToastController } from '@ionic/angular/';
import { Router } from '@angular/router';

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
  constructor(private provider : ForumServiceService, private router : ActivatedRoute, 
    private toastController : ToastController, private rout : Router) { }

  ngOnInit() {
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
      toast.present()
      this.rout.navigate(["menu-sala/forum", this.idSala])
    })
    
  }

}
