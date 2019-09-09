import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuSalaPage } from './menu-sala.page';

const routes: Routes = [
  {
    path: 'resumo/:sala-aula',
    redirectTo: 'resumo/:sala-aula',
    pathMatch: 'full'
  },
   {
    path: '',
    component: MenuSalaPage,
    children: [
      {
        path: 'resumo',
        loadChildren: '../resumo/resumo.module#ResumoPageModule',
      },
      {
        path: 'resumo/:sala-aula',
        loadChildren: '../resumo/resumo.module#ResumoPageModule',
      },
      {
        path: 'quiz',
        loadChildren: '../quiz/quiz.module#QuizPageModule',
      },
      {
        path: 'quiz/:sala-aula',
        loadChildren: '../quiz/quiz.module#QuizPageModule',
      },
      {
        path: 'forum/:sala-aula',
        loadChildren: '../forum/forum.module#ForumPageModule',
      },
      {
        path: 'listar-usuario/:sala-aula',
        loadChildren: '../listar-usuario/listar-usuario.module#ListarUsuarioPageModule',
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
