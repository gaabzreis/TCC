import { Component, OnInit } from '@angular/core';
import { forum, resp, ForumServiceService } from '../services/forum-service.service'
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular/';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resp-insert',
  templateUrl: './resp-insert.page.html',
  styleUrls: ['./resp-insert.page.scss'],
})
export class RespInsertPage implements OnInit {
  resp : resp
  forum : forum
  idForum = this.rout.snapshot.params['idForum']
  resposta: string
  idUser = sessionStorage.getItem('idUser')
  constructor(private router : Router, private rout: ActivatedRoute, private provider : ForumServiceService, public toastController: ToastController) { }

  ngOnInit() {
    this.provider.getByFilter(this.idForum).subscribe(res => {
      this.forum = res
    })
  }

  async salvar(){
    const toast = await this.toastController.create({
      message: 'Resposta salva com sucesso.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.router.navigate(["forum-list", this.idForum])
          }
        }
      ]
    });
    this.resp = {resposta: this.resposta, likes: 0, criador: this.idUser}
    if(this.forum.respostas == undefined){
      this.forum.respostas = [this.resp]
    }
    else{
      this.forum.respostas.push(this.resp)
    }

    this.provider.updateForum(this.idForum, this.forum).then(res => {
      toast.present()
    })
  }



}
