import { Component, OnInit } from '@angular/core';
import {atividade, AtividadeKanbanService} from '../../services/atividade-kanban.service'
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { NovaAtividadePage } from '../nova-atividade/nova-atividade.page';

@Component({
  selector: 'app-detalhes-atividade',
  templateUrl: './detalhes-atividade.page.html',
  styleUrls: ['./detalhes-atividade.page.scss'],
})
export class DetalhesAtividadePage implements OnInit {

  atividade: atividade;

  constructor(
    private activatedRoute: ActivatedRoute,
    private actionSheetController: ActionSheetController,
    private providerAtividadeKanban: AtividadeKanbanService,
    private router: Router,
    private modalController: ModalController ) { }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.atividade = {
          id: params.id,
          nome: params.nome,
          dataEntrega: params.dataEntrega,
          descricao: params.descricao,
          idDisciplina: params.idDisciplina,
          idUser: params.idUser,
          quadro: params.quadro
        }
      });
  }

  async maisOpcoes() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Mais opções',
      buttons: [{
          text: 'Editar',
          handler: () => {
            this.mostrarEdicao();
          }
        }, {
        text: 'Exclir',
        role: 'destructive',
        handler: () => {
          this.providerAtividadeKanban.deleteAtividade(this.atividade.id);
          this.router.navigate(['kanban-home']);
        }
        }, {
        text: 'Cancelar',
        role: 'cancel',
      }]
    });
    await actionSheet.present();
  }

  async mostrarEdicao() {
    const modal = await this.modalController.create({
      component: NovaAtividadePage,
      componentProps: { 
        ...this.atividade
      }
    });
    return await modal.present();
  }

}
