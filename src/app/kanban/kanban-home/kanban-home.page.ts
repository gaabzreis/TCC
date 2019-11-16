import { Component } from '@angular/core';
import {atividade, AtividadeKanbanService} from '../../services/atividade-kanban.service'
import { sala, SalaAulaService } from '../../services/sala-aula.service';
import { NovaAtividadePage } from '../nova-atividade/nova-atividade.page';
import { ModalController, PopoverController } from '@ionic/angular';
import * as moment from "moment"; 
import { PopoverItensComponent } from '../popover-itens/popover-itens.component';
import { Router } from '@angular/router';
import {IonSlides} from '@ionic/angular';
import {ViewChild} from '@angular/core';

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

  @ViewChild('slides', { read: IonSlides }) slides: IonSlides;

  idUser: string
  paraFazer: atividade[]
  emAndamento: atividade[]
  feito: atividade[]
  nomesDisciplinas: nomeDisciplina[]
  kanbanSelecionado: string = "paraFazer"
  indexSlide: number = 0;

  public progressClick: number = 0;
  protected interval: any;

  constructor(
    private modalController: ModalController, 
    private provider: AtividadeKanbanService, 
    private providerSala: SalaAulaService,
    private popoverController: PopoverController,
    private router: Router
    ) 
     {
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

  ngOnInit() { }

  ionViewDidEnter() {
    
    this.atualizaCard();
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
        return x.nomeDisciplina
      }
    })
  }

  slideChanged() {
    this.slides.getActiveIndex().then( index => {
      this.indexSlide = index;
    })
  }

async onPress(ev, atv, board) {
  console.log("LOG -> ", atv, " -> ", board);
  let quadroes = []
  if(board == "para-fazer"){
    quadroes = this.paraFazer
  }
  else if(board == "em-andamento"){
    quadroes = this.emAndamento

  }
  else{
    quadroes = this.feito
  }
  
  const popover = await this.popoverController.create({
    component: PopoverItensComponent,
    event: ev,
    componentProps: {
      idAtividade: atv,
      boardSelected: board,
      arrayBoard: quadroes
    }
  });
  
  await popover.present();
 
  this.atualizaCard()
}

atualizaCard(){
  
  
  this.provider.getAll().subscribe(res => {
    this.paraFazer = []
    this.emAndamento = []
    this.feito = []
    res.filter (atv => {
      console.log(atv)
      if (atv.idUser == this.idUser){
        switch (atv.quadro) {
          case "para-fazer": {
            if(!this.paraFazer.find(x => x.id == atv.id)){
              this.paraFazer.push(atv)
              break
            }
            
          }
          case "em-andamento": {
            if(!this.emAndamento.find(x => x.id == atv.id)){
              this.emAndamento.push(atv)
              break
            }
          }
          case "feito": {
            if(!this.feito.find(x => x.id == atv.id)){
              this.feito.push(atv)
              break
            }
          }
        }
      }
    })
  })
}

openDetails(atv: atividade) {
  let nomeDisciplina = this.getNome(atv.idDisciplina)
  this.router.navigate(['detalhes-atividade'], {
    queryParams: { ...atv, nomeDisciplina: nomeDisciplina[0].nomeDisciplina}
  });
}

setKanbanSelecionado(kanban) {
  this.kanbanSelecionado = kanban;
  console.log("Selecionado -> " + kanban);
}

getKanbanSelecionado() {
  return this.kanbanSelecionado;
}

  dadosMock () {
    this.paraFazer = [{
      nome: "Modelo lógico do IFIP",
      idDisciplina: "Banco de Dados",
      idUser: "mock",
      dataEntrega: moment().format("DD/MM/YY"),
      descricao: "Cnstruir o modelo lógico do IFIP",
      quadro: "para-fazer"
    }, {
      nome: "Lista de exercícios 02",
      idDisciplina: "Lógica Matemática",
      idUser: "mock",
      dataEntrega: moment().format("DD/MM/YY"),
      descricao: "Fazer atividades da lista",
      quadro: "para-fazer"
    }]
    this.emAndamento = [{
      nome: "Mapa mental dos modelos",
      idDisciplina: "Banco de Dados",
      idUser: "mock",
      dataEntrega: moment().format("DD/MM/YY"),
      descricao: "Realizar o mapa mental",
      quadro: "em-andamento"
    }]
    this.feito = [{
      nome: "Atividade esteganografia",
      idDisciplina: "Segurança",
      idUser: "mock",
      dataEntrega: moment().format("DD/MM/YY"),
      descricao: "Realizar leitura do material",
      quadro: "feito"
    }, {
      nome: "Diagrama de sequência",
      idDisciplina: "APS I",
      idUser: "mock",
      dataEntrega: moment().format("DD/MM/YY"),
      descricao: "Fazer o diagrama do projeto",
      quadro: "feito"
    }]
  }


}
