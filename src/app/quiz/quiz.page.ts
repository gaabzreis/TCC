import { QuizService, Quiz, Resposta } from './../quiz.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { map, filter } from "rxjs/operators";
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

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
  constructor(public toastController: ToastController, private provider : QuizService, private route: ActivatedRoute, private loadingController: LoadingController) { } 

  ngOnInit() {
    this.loadTodo()
  }
  
  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Carregando conteúdo...'
    });
    await loading.present();
    
    this.provider.getAll().subscribe(res => {
      
      this.todo = res;
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

}
