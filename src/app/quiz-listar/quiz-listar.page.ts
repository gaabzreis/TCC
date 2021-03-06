import { Component, OnInit } from '@angular/core';
import { QuizService, Resposta, Quiz } from './../services/quiz.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastController, AlertController  } from '@ionic/angular';
import { map, filter, reduce } from "rxjs/operators";
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
/* import {Math } from 'mathjs' */
import { LoginServiceService, User} from '../services/login-service.service'
import { sala, SalaAulaService} from '../services/sala-aula.service'

@Component({
  selector: 'app-quiz-listar',
  templateUrl: './quiz-listar.page.html',
  styleUrls: ['./quiz-listar.page.scss'],
})
export class QuizListarPage implements OnInit {
  todo : Quiz[]
  mostrar: Quiz[]
  res: Quiz[]
  rand2 : number[]
  respostas: {} = [{
    descricao: "",
    acerto: false
  }]
  marcacaoPont = 0
  verGab = false
  idSala = this.route.snapshot.params['conteudo'].split("@")[2]
  idUser = sessionStorage.getItem('idUser')
  usuario: User
  sala: sala
  usuarioVoto: User
  buttonColor: string = '#f47f54';

  constructor(private router: Router, 
              public alertController: AlertController, 
              private route: ActivatedRoute, 
              private loadingController: LoadingController, 
              private provider: QuizService, 
              private toast : ToastController,
              private userPorvider: LoginServiceService,
              private salaProvider: SalaAulaService) { }

  ngOnInit() {
    this.userPorvider.getByFilter(this.idUser).subscribe(res => {
      this.usuario = res
    })
    this.salaProvider.getByFilter(this.idSala).subscribe(res => {
      this.sala = res
    })
    this.loadTodo()
  }

  marcarItem () {
    if (this.buttonColor == '#f47f54')
      this.buttonColor = '#76ccd0';
      else
      this.buttonColor = '#f47f54';
  }

  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Carregando quiz...'
    });
    await loading.present();

    let tag = this.route.snapshot.params['conteudo'].split("@")[0].split(",")
    let index = this.route.snapshot.params['conteudo'].split("@")[1]

    await this.provider.getAll().subscribe(res => {
      
      this.todo = res.sort((atual, prev) => {
        if(atual.likes == prev.likes){
          return 0
        }
        return (atual.likes > prev.likes ? -1 : 1)
      });
      let cont = 0
      this.res = this.todo.reduce((prev, atual) => {
        
        loading.dismiss();
        if(tag.find(x => x === atual.tag) && cont < index){
          cont++
          let delimiter = atual.respostas.length
          let randomico = Math.floor(Math.random() * (delimiter - 0))
          atual.respostas = atual.respostas.map((e, index) => {
            if(index == 0){
              this.rand2 = [randomico]
            }
            else{
              let rand1 = Math.floor(Math.random() * (delimiter - 0))
              
              while(this.rand2.find(x => x === rand1) != undefined){
                
                rand1 = Math.floor(Math.random() * (delimiter - 0))
              }
              this.rand2 = [...this.rand2, rand1]
            }
            
            return {descricao:  atual.respostas[this.rand2[index]].descricao, acerto: atual.respostas[this.rand2[index]].acerto}
          })
          return [...prev, atual]
        }
        return [...prev]
      }, [])
      this.respostas = this.res.map(e => {
        return e.respostas.map(y => {
          return {descricao: y.descricao, acerto: y.acerto, marcado: false}
        }) 
      })
      
      
    });
    
    

    
     
    

  }

  async responder(){
   
    let tam = this.res.length
    let marcador = []
    let somatorio = []
    
    for(let j = 0; j < tam; j++){
      marcador = [...marcador, this.respostas[j].map(e => {
        return e.acerto == e.marcado ? (!e.acerto ? 0 : 1 ) : -1
      })]
       
    }
    
    for(let j = 0; j < tam; j++){
      somatorio = [...somatorio, marcador[j].reduce((prev, atual) => {
        return parseInt(prev) + parseInt(atual)
      }, 0)]
    }
    somatorio = somatorio.filter(valor => {
      return valor > 0
    }, 0)
    if(this.usuario.pontos == undefined){
      this.usuario.pontos = 0
    }
    this.usuario.pontos += somatorio.length
    let usuarioSala = this.sala.integrantes.find(x => x.idIntegrante == this.idUser)

    this.userPorvider.update(this.idUser, this.usuario)
    this.salaProvider.update(this.idSala, this.sala)

    const alert = await this.alertController.create({
      header: 'Parabéns!',
      subHeader: 'resultado',
      message: 'Você acertou ' + somatorio.length + " questões e acumulou mais " + somatorio.length  + " pontos no ranking",
      buttons: [{
        text: 'Responder novamente',
        cssClass: 'primary',
        handler: (blah) => {
          this.router.navigate(["quiz"])
        }
      }, {
        text: 'Ver gabarito',
        cssClass: 'secondary',
        handler: (blah) => {
          this.verGab = true
        }
      }]
    });
    await alert.present();
  }

  async like(id, obj){
    
    const toast = await this.toast.create({
      message: 'Pergunta dado like com sucesso.',
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
    if(obj.liker == undefined){
      obj.liker = [this.idUser]
    }
    else{
      if(obj.liker.find(x => x == this.idUser)){
        toast.message = "Você já votou nessa pergunta"
        toast.present()
        return false
      }
      else{
        obj.liker.push(this.idUser)
      }
    }
    if(obj.likes == undefined){
      obj.likes = 1
    }
    else{
      obj.likes++
    }
    let usuarioVotado : any
    let salaVotada : any
    usuarioVotado = await this.userPorvider.getById(obj.criador)
    salaVotada = await this.salaProvider.getById(obj.idSala)
    if(usuarioVotado.pontos == undefined){
      usuarioVotado.pontos = 0
    }
    usuarioVotado.pontos += 15
    console.log(salaVotada)
    const salaUsuarios = salaVotada.integrantes.filter(x => x.idIntegrante == obj.criador)
    
    salaUsuarios[0].pontos += 15
    
    
    this.userPorvider.update(obj.criador, usuarioVotado).then(a => {
      console.log("user provider")

    }) 
    this.salaProvider.update(obj.idSala, salaVotada).then(a => {
      console.log("sala provider")

    }) 
    
    //usuarioVoto.unsubscribe()
   
    this.provider.update(id, obj).then(res => {
      toast.present()
    })
    
  // }

}
}
