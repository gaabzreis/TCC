import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfigurarNotificacaoPage } from './configurar-notificacao.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigurarNotificacaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConfigurarNotificacaoPage]
})
export class ConfigurarNotificacaoPageModule {}
