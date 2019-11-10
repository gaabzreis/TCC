import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {sala, SalaAulaService} from '../../services/sala-aula.service'
import { AtividadeKanbanService, atividade } from '../../services/atividade-kanban.service'
import * as moment from "moment"; 
import { Router, ActivatedRoute } from '@angular/router';

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
  
  constructor(
    private modalController: ModalController, 
    private providerSala: SalaAulaService,
    private providerKanban: AtividadeKanbanService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { 
      this.quadro = "para-fazer"
  }

  ngOnInit() {
    this.providerSala.getAll().subscribe(result => {
      this.listaDisciplinas = result.filter ( user => {
        return user.integrantes.find ( 
          x => x.idIntegrante == this.idUser ) || user.adm == this.idUser
      })
      this.editar();
    })
  }

  editar () {
    this.activatedRoute.queryParams
    .subscribe(params => {
      if (params.id != null) {
        this.nome = params.nome;
        //TODO: Auto completar disciplina.

        this.disciplina = params.idDisciplina;
        // this.disciplina = this.listaDisciplinas.filter (result => {
        //   if (params.idDisciplina == result.id) {
        //     return result.descricao;
        //   }
        // })[0].descricao;
        this.dataEntrega = moment(params.dataEntrega, "DD/MM/YY").format("YYYY-MM-DDTHH:mmZ");
        this.descricao = params.descricao;
        this.quadro = params.quadro;
        this.disciplina = params.idDisciplina
        this.atividade = {
          id: params.id,
          nome: this.nome,
          idDisciplina: this.disciplina,
          idUser: this.idUser,
          dataEntrega: moment(this.dataEntrega).format("DD/MM/YY"),
          descricao: this.descricao,
          quadro: this.quadro
        }
      }
    });
  }

  async salvarAtividade() {
    if (this.atividade) {
      console.log("2.this.atividade.id -> ", this.atividade.id)
      this.atividade.nome = this.nome,
      this.atividade.idDisciplina = this.disciplina,
      this.atividade.dataEntrega = moment(this.dataEntrega).format("DD/MM/YY"),
      this.atividade.descricao = this.descricao,
      this.atividade.quadro = this.quadro
      
      this.providerKanban.updateAtividade(this.atividade.id, this.atividade);
    } else {
      this.atividade = {
        nome: this.nome,
        idDisciplina: this.disciplina,
        idUser: this.idUser,
        dataEntrega: moment(this.dataEntrega).format("DD/MM/YY"),
        descricao: this.descricao,
        quadro: this.quadro
      }
      this.providerKanban.addAtividadeKanban(this.atividade);
    }
    this.fecharModal();
  }

  fecharModal() {
    this.modalController.dismiss();
  }


}
