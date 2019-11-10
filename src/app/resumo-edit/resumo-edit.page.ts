import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { ResumoService, Resumo } from './../services/resumo.service';
import { FirebaseApp } from 'angularfire2';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resumo-edit',
  templateUrl: './resumo-edit.page.html',
  styleUrls: ['./resumo-edit.page.scss'],
})

export class ResumoEditPage implements OnInit {
  todo: Resumo 
  todoId: string
  idUser = sessionStorage.getItem('idUser')
  htmlToAdd;

  constructor(
    private route: ActivatedRoute, 
    private loadingController: LoadingController, 
    private provider: ResumoService,
    private firebase: FirebaseApp,
    private alertController: AlertController,
    private rotas : Router) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId)  {
      this.loadTodo();
    }
  }
  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });
    await loading.present();
    
    this.provider.getByFilter(this.todoId).subscribe(res => {
      loading.dismiss();
      this.todo = res;
      this.carregarImagem();
      console.log(this.todo)
    });
  }
  setarId(){
    sessionStorage.setItem('resumo', this.todoId)
  }

  carregarImagem () {
    this.firebase.storage().ref().child(this.todo.tag + '.jpg').getDownloadURL().then( 
      (url) => {
        this.htmlToAdd = "<img src='" + url + "'>";
      }
    )
  } 
  async deletar(){

    const alert = await this.alertController.create({
      header: 'Aviso',
      message: 'Tem certeza que deseja excluir o resumo com a tag ' + this.todo.tag + "?",
      buttons: [
        {
          text: 'Sim',
          cssClass: 'secondary',
          handler: (action) => {
            console.log(this.todoId)
            this.provider.delete(this.todoId)
            this.rotas.navigate(['menu-sala/resumo/',this.todo.idSala])
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
}
