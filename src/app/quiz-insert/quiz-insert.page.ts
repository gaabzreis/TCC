import { Component, OnInit } from '@angular/core';
import { QuizService, Resposta, Quiz } from './../services/quiz.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiz-insert',
  templateUrl: './quiz-insert.page.html',
  styleUrls: ['./quiz-insert.page.scss'],
})
export class QuizInsertPage implements OnInit {
  contador = 1
  valores : Number[] = [1]
  tag: String
  tagSelecionada : String
  titulo: String
  pergunta: String
  respostas : Resposta[] = [{
    descricao: "",
    acerto: false
  }]
  idUser = sessionStorage.getItem('idUser')
  idSala = this.routeres.snapshot.params["sala-aula"]
  temTag = false
  todasTags : string[] = []
  constructor(private provider: QuizService, public toastController: ToastController, 
    private rotas : Router, private routeres : ActivatedRoute) { }

  ngOnInit() {
    if(this.idSala == undefined){
      let idQuiz = sessionStorage.getItem('editQuiz')
      this.provider.getByFilter(idQuiz).subscribe(res => {
        this.pergunta = res.pergunta
        this.tag = res.tag
        this.titulo = res.titulo
        this.respostas = res.respostas
        this.valores = []
        this.idSala = res.idSala
        res.respostas.forEach((x, index) => {
          this.valores.push(index + 1)
          this.contador = index + 1
        })
      })
    }
    else{
      this.provider.getAll().subscribe(res => {
        this.todasTags = res.filter(x => x.idSala = this.idSala).reduce((prev,atual) => {
          if(prev.find(x => x.tag == atual.tag)){
            return [...prev]
          }
          return [...prev, atual]
        }, [])
      })
    }
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

    if(!this.temTag){
      conteudo.tag = this.tagSelecionada
    }
    console.log(this.tagSelecionada)
    if(this.titulo == "" || (this.tag == "" && this.tagSelecionada == "") || this.pergunta == "" || this.respostas.length == 0 || !this.respostas.find(x => x.acerto)){
      toast.message = "Favor preencher todos os campos corretamente"
      toast.present()
      return  
    }
    
    if(this.routeres.snapshot.params["sala-aula"] == undefined){
      conteudo.id = sessionStorage.getItem('editQuiz')
      this.provider.update(conteudo.id, conteudo).then(res => {
        this.rotas.navigate(['/quiz', this.idSala]);
      })
    }
    else{
      this.provider.addQuiz(conteudo).then(() => {
        this.valores = [1]
        this.respostas = [{
          acerto: false,
          descricao: ""
        }]
        this.pergunta = ""
        this.tag = ""
        this.titulo = ""
        toast.present();
      })
    }
    
    
  }

  addTag(valor){
    this.temTag = valor
  }

}
