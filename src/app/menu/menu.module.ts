import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
 
import { IonicModule } from '@ionic/angular';
 
import { MenuPage } from './menu.page';
 
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
   {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'sala-aula',
        loadChildren: '../sala-aula/sala-aula.module#SalaAulaPageModule',
      },
      {
        path: 'home',
        loadChildren: '../home/home.module#HomePageModule',
      },
      {
        path: 'kanban',
        loadChildren: '../kanban/kanban-home/kanban-home.module#KanbanHomePageModule',
      }
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
  declarations: [ MenuPage ]
})
export class MenuPageModule { }