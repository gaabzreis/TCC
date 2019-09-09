import { Component, OnInit } from '@angular/core';
import { forum, resp, ForumServiceService } from '../services/forum-service.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.page.html',
  styleUrls: ['./forum-list.page.scss'],
})
export class ForumListPage implements OnInit {
  idForum = this.router.snapshot.params['sala-aula']
  forum : forum
  idUser = sessionStorage.getItem('idUser')
  constructor(private provider : ForumServiceService, private router : ActivatedRoute, private toastController : ToastController) { }

  ngOnInit() {
    this.provider.getByFilter(this.idForum).subscribe(res => {
      this.forum = res
      if(this.forum.respostas != undefined){
        this.forum.respostas = this.forum.respostas.sort((a,b) => {
          if(a.likes == b.likes){
            return 0
          }
          return (a.likes > b.likes ? -1 : 1)
        })
      }
      
    })
  }

  async maisLikes(index, valor){
    const toast = await this.toastController.create({
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            
          }
        }
      ]
    });
    if(this.forum.respostas[index].pessoasResponderam != undefined){
      if(this.forum.respostas[index].pessoasResponderam.find(x => x == this.idUser)){
        toast.message = "Você já votou nessa resposta"
        toast.present()
        return
      }
      else if(this.forum.respostas[index].criador == this.idUser){
        toast.message = "Você não pode votar na sua resposta"
        toast.present()
        return
      }
      else{
        this.forum.respostas[index].likes += valor
        this.forum.respostas[index].pessoasResponderam.push(this.idUser)
      }
    }
    else if(this.forum.respostas[index].criador == this.idUser){
      toast.message = "Você não pode votar na sua resposta"
      toast.present()
      return
    }
    else{
      this.forum.respostas[index].likes += valor
      this.forum.respostas[index].pessoasResponderam = [this.idUser]
    }

    this.provider.updateForum(this.idForum, this.forum)
    
  }

}
