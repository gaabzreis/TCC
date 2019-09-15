import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AtividadeKanbanService, atividade } from '../../services/atividade-kanban.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-popover-itens',
  templateUrl: './popover-itens.component.html',
  styleUrls: ['./popover-itens.component.scss'],
})
export class PopoverItensComponent implements OnInit {
  @Input("idAtividade") idAtividade;
  @Input("boardSelected") boardSelected;
  @Input("arrayBoard") arrayBoard;

  constructor(
    private popoverController: PopoverController,
    private providerKanban: AtividadeKanbanService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  moverAtividade(quadro: string) {
    this.arrayBoard = this.arrayBoard.filter(x => {
      return x.id != this.idAtividade
    })
    this.providerKanban.moverAtividade(this.idAtividade, quadro);
    this.popoverController.dismiss();
  }
  
}
