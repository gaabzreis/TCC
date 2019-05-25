import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResumoInsertPage } from './resumo-insert.page';

const routes: Routes = [
  {
    path: '',
    component: ResumoInsertPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResumoInsertPage]
})
export class ResumoInsertPageModule {}
