import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuSalaPage } from './menu-sala.page';

const routes: Routes = [
  {
    path: 'sala-home/:sala-aula',
    redirectTo: 'sala-home/:sala-aula',
    pathMatch: 'full'
  },
   {
    path: '',
    component: MenuSalaPage,
    children: [
      {
        path: 'sala-home/:sala-aula',
        loadChildren: '../sala-home/sala-home.module#SalaHomePageModule',
      },
     
    ]
  } 
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuSalaPage]
})
export class MenuSalaPageModule {}
