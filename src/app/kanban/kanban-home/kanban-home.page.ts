import { Component } from '@angular/core';

import { NovaAtividadePage } from '../nova-atividade/nova-atividade.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-kanban-home',
  templateUrl: './kanban-home.page.html',
  styleUrls: ['./kanban-home.page.scss'],
})
export class KanbanHomePage {

  constructor(private modalController: ModalController) {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NovaAtividadePage
    });

    modal.onDidDismiss()
      .then((data) => {
        const user = data['data']; // Here's your selected user!
    });

    return await modal.present();
  }

}
