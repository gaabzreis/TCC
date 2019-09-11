import { Component } from '@angular/core';
import {atividade, AtividadeKanbanService} from '../../services/atividade-kanban.service'
import { sala, SalaAulaService } from 'src/app/services/sala-aula.service';
import { NovaAtividadePage } from '../nova-atividade/nova-atividade.page';
import { ModalController } from '@ionic/angular';
import * as moment from "moment"; 

export interface nomeDisciplina {
  idSala: string
  nomeDisciplina: string
}

@Component({
  selector: 'app-kanban-home',
  templateUrl: './kanban-home.page.html',
  styleUrls: ['./kanban-home.page.scss'],
})
export class KanbanHomePage {

  idUser: string
  paraFazer: atividade[]
  emAndamento: atividade[]
  feito: atividade[]
  nomesDisciplinas: nomeDisciplina[]

  public progressClick: number = 0;
  protected interval: any;

  constructor(private modalController: ModalController, private provider: AtividadeKanbanService, 
     private providerSala: SalaAulaService ) {
    this.idUser = sessionStorage.getItem('idUser')
    if (this.idUser == "mock") {
      this.dadosMock()
    } else {
      this.paraFazer = []
      this.emAndamento = []
      this.feito = []
      this.nomesDisciplinas = []
    }
  }

  ngOnInit() { 
  }

  ionViewDidEnter() {
    this.provider.getAll().subscribe(res => {
      res.filter (atv => {
        if (atv.id == this.idUser){
          switch (atv.quadro) {
            case "para-fazer": {
              this.paraFazer.push(atv)
              break
            }
            case "em-andamento": {
              this.emAndamento.push(atv)
              break
            }
            case "feito": {
              this.feito.push(atv)
              break
            }
          }
        }
      })
    })

    this.providerSala.getAll().subscribe( res => {
      res.filter (sla => {
        this.nomesDisciplinas.push({
          idSala: sla.id,
          nomeDisciplina: sla.descricao
        })
      })
    })

    console.log("Dicionario dos nomes das disciplinas: ", this.nomesDisciplinas)
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NovaAtividadePage
    });

    modal.onDidDismiss()
      .then((data) => {
        const user = data['data']; 
    });

    return await modal.present();
  }

  getNome (id: string) {
    return this.nomesDisciplinas.filter ( x => {
      if (x.idSala == id) {
        // console.log("LOG do IF: " + x.nomeDisciplina)
        return x.nomeDisciplina
      }
    })
  }
  
  onPress($event) {
    console.log("onPress", $event);
    console.log("click");
    if (this.progressClick == 5) {
      console.log("LOG 5");
    }
    //this.pressState = 'pressing';
    this.startInterval();
}

onPressUp($event) {
    console.log("onPressUp", $event);
    //this.pressState = 'released';
    this.stopInterval();
    this.progressClick = 0;
}

startInterval() {
    const self = this;
    this.interval = setInterval(function () {
        self.progressClick = self.progressClick + 1;
    }, 50);
}

stopInterval() {
    clearInterval(this.interval);
}

  dadosMock () {
    this.paraFazer = [{
      nome: "Modelo lógico do IFIP",
      idDisciplina: "Banco de Dados",
      dataEntrega: moment().format("DD/MM/YY"),
      descricao: "Cnstruir o modelo lógico do IFIP",
      quadro: "para-fazer"
    }, {
      nome: "Lista de exercícios 02",
      idDisciplina: "Lógica Matemática",
      dataEntrega: moment().format("DD/MM/YY"),
      descricao: "Fazer atividades da lista",
      quadro: "para-fazer"
    }]
    this.emAndamento = [{
      nome: "Mapa mental dos modelos",
      idDisciplina: "Banco de Dados",
      dataEntrega: moment().format("DD/MM/YY"),
      descricao: "Realizar o mapa mental",
      quadro: "em-andamento"
    }]
    this.feito = [{
      nome: "Atividade esteganografia",
      idDisciplina: "Segurança",
      dataEntrega: moment().format("DD/MM/YY"),
      descricao: "Realizar leitura do material",
      quadro: "feito"
    }, {
      nome: "Diagrama de sequência",
      idDisciplina: "APS I",
      dataEntrega: moment().format("DD/MM/YY"),
      descricao: "Fazer o diagrama do projeto",
      quadro: "feito"
    }]
  }

}
