import { QuizService, Quiz, Resposta } from './../services/quiz.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { map, filter } from "rxjs/operators";
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {
  tagSelect: String[]
  todo : Quiz[]
  qtdQuiz: number[]
  index: String
  somenteTag: Quiz[]
  idUser = sessionStorage.getItem('idUser')
  idSala = this.route.snapshot.params["sala-aula"]
  minhasPerguntas : Quiz[]
  constructor(public toastController: ToastController, private provider : QuizService, private rotas : Router, 
    public alertController : AlertController, private route: ActivatedRoute, private loadingController: LoadingController) { } 

  ngOnInit() {
    this.loadTodo()
  }
  
  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Carregando conteúdo...'
    });
    await loading.present();
    
    this.provider.getAll().subscribe(res => {
      
      this.todo = res.filter(x => x.criador != this.idUser && x.idSala == this.idSala);
      this.minhasPerguntas = res.filter(x => x.criador == this.idUser && x.idSala == this.idSala)
      console.log(this.minhasPerguntas.length)
      loading.dismiss();
      this.somenteTag = this.todo.reduce((prev, atual) => {
        if(prev.find(x => x.tag == atual.tag)){
          return [...prev]
        }
        return [...prev, atual]
      }, [])
    });
  }

  async teste(){
    const loading = await this.loadingController.create({
      message: 'Carregando conteúdo...'
    });
    await loading.present();
    this.qtdQuiz = []
    if(this.tagSelect == undefined){
      const toast = await this.toastController.create({
        message: 'Favor selecionar a tag primeiro',
        duration: 5000,
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
      loading.dismiss();
      toast.present()
      return
    }
    
    let qtd = this.todo.reduce((prev, atual) => {
      if(this.tagSelect.find(x => x === atual.tag)){
        return [...prev, atual]
      }
      return [...prev]
    }, [])
    for(let i =0; i < qtd.length; i++){
      this.qtdQuiz = [...this.qtdQuiz, i + 1]
    }

    console.log(this.qtdQuiz)
    loading.dismiss();

  }

  async delete(obj){
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: 'Tem certeza que deseja a pergunta ' + obj.pergunta + "?",
      buttons: [
        {
          text: 'Sim',
          cssClass: 'secondary',
          handler: (action) => {
            this.excluirBase(obj.id)
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
    })
    alert.present()
  }

  async excluirBase(id){
    const toast = await this.toastController.create({
      message: 'Pergunta excluido com sucesso!',
      duration: 5000,
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
    this.provider.delete(id).then(res => {
      toast.present()
    })
  }

  edit(obj){
    sessionStorage.setItem('editQuiz', obj.id)
    this.rotas.navigate(['/quiz-insert']);
  }
}
