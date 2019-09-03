import { Component } from '@angular/core';
import {atividade, AtividadeKanbanService} from '../../services/atividade-kanban.service'
import { sala, SalaAulaService } from 'src/app/services/sala-aula.service';
import { NovaAtividadePage } from '../nova-atividade/nova-atividade.page';
import { ModalController } from '@ionic/angular';
import * as moment from "moment"; 

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
  nomesDisciplinas: [{
    idSala: string,
    nomeDisciplina: string
  }]

  constructor(private modalController: ModalController, private provider: AtividadeKanbanService, 
     private providerSala: SalaAulaService ) {
    this.idUser = sessionStorage.getItem('idUser')
    if (this.idUser == "mock") {
      this.dadosMock()
    } else {
      this.paraFazer = []
      this.emAndamento = []
      this.feito = []
      this.nomesDisciplinas = [{idSala: "", nomeDisciplina: ""}]
    }
  }

  ngOnInit() { }

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

    console.log("Sala: ", this.nomesDisciplinas)
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
