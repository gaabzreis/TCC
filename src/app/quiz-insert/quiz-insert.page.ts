import { Component, OnInit } from '@angular/core';
import { QuizService, Resposta, Quiz } from './../services/quiz.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-insert',
  templateUrl: './quiz-insert.page.html',
  styleUrls: ['./quiz-insert.page.scss'],
})
export class QuizInsertPage implements OnInit {
  contador = 1
  valores : Number[] = [1]
  tag: String
  titulo: String
  pergunta: String
  respostas : Resposta[] = [{
    descricao: "",
    acerto: false
  }]
  idUser = sessionStorage.getItem('idUser')
  idSala = this.routeres.snapshot.params["sala-aula"]
  constructor(private provider: QuizService, public toastController: ToastController, private routeres : ActivatedRoute) { }

  ngOnInit() {
  }

  addContador(){
    this.contador++
    if(this.respostas == undefined){
      this.respostas = [{
        descricao: "",
        acerto: false
      }]
    }
    else{
      this.respostas = [...this.respostas, {
        descricao: "",
        acerto: false
      }]
    }
    if(this.valores == undefined){
      this.valores = [this.contador]
    }
    else{
      this.valores = [...this.valores, this.contador]
    }

  }
  removeContador(){
    if(this.contador < 1){
      return
    }
    this.respostas = this.respostas.reduce((prev, atual, index) => {
      if(index == this.contador - 1){
        return [...prev]
      }
      return [...prev, atual]
    }, [])
    
    this.valores = this.valores.reduce((prev, atual) => {
      if(atual == this.contador){
        return [...prev]
      }
      return [...prev, atual]
    }, [])
    this.contador--
  }

  async salvar(){
    const toast = await this.toastController.create({
      message: 'Quiz salvo com sucesso.',
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
    let conteudo : Quiz = {
      titulo: this.titulo, 
      tag: this.tag, 
      pergunta: this.pergunta, 
      respostas: this.respostas,
      criador: this.idUser,
      idSala: this.idSala
    }
    
    this.provider.addQuiz(conteudo).then(() => {
      toast.present();
    })
  }

}
