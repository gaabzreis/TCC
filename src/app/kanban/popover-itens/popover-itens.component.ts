import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, Events } from '@ionic/angular';

@Component({
  selector: 'app-popover-itens',
  templateUrl: './popover-itens.component.html',
  styleUrls: ['./popover-itens.component.scss'],
})
export class PopoverItensComponent implements OnInit {
  @Input("idAtividade") idAtividade;
  @Input("boardSelected") boardSelected;

  constructor(
    private events: Events,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    console.log("idAtividade = ", this.idAtividade);
    console.log("boardSelected = ", this.boardSelected);
  }

  moverParaFazer() {
    console.log("Para Fazer");
  }

  moverEmAndamento() {
    console.log("moverEmAndamento");
  }

  moverFeito() {
    this.events.publish('fromPopoverEvent');
    this.popoverController.dismiss();
  }

}
