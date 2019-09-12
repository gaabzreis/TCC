import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {sala, SalaAulaService} from '../../services/sala-aula.service'
import { AtividadeKanbanService, atividade } from 'src/app/services/atividade-kanban.service';
import * as moment from "moment"; 

@Component({
  selector: 'app-nova-atividade',
  templateUrl: './nova-atividade.page.html',
  styleUrls: ['./nova-atividade.page.scss'],
})
export class NovaAtividadePage implements OnInit {
  
  idUser = sessionStorage.getItem('idUser')
  listaDisciplinas : sala[]
  atividade: atividade

  nome: string
  disciplina: string
  dataEntrega: string
  descricao: string
  quadro: string
  minDate: string
  
  constructor(private modalController: ModalController, private providerSala: SalaAulaService,
    private providerKanban: AtividadeKanbanService) { 
    this.quadro = "para-fazer"
  }

  ngOnInit() {
    this.providerSala.getAll().subscribe(result => {
      this.listaDisciplinas = result.filter ( user => {
        return user.integrantes.find ( 
          x => x == this.idUser ) || user.adm == this.idUser
      })
    })
  }

  salvarAtividade() {
    this.atividade = {
      nome: this.nome,
      idDisciplina: this.disciplina,
      idUser: this.idUser,
      dataEntrega: moment(this.dataEntrega).format("DD/MM/YY"),
      descricao: this.descricao,
      quadro: this.quadro
    }
    this.providerKanban.addAtividadeKanban(this.atividade)
    this.fecharModal();
  }

  fecharModal() {
    this.modalController.dismiss();
  }


}
