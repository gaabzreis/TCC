import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-nova-atividade',
  templateUrl: './nova-atividade.page.html',
  styleUrls: ['./nova-atividade.page.scss'],
})
export class NovaAtividadePage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
