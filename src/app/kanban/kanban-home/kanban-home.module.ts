import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { KanbanHomePage } from './kanban-home.page';
import { PopoverItensComponent } from '../popover-itens/popover-itens.component';

const routes: Routes = [
  {
    path: '',
    component: KanbanHomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [PopoverItensComponent],
  declarations: [KanbanHomePage, PopoverItensComponent]
})
export class KanbanHomePageModule {}
