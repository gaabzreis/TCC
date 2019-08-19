import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'resumo-edit', loadChildren: './resumo-edit/resumo-edit.module#ResumoEditPageModule' },
  { path: 'resumo-edit/:id', loadChildren: './resumo-edit/resumo-edit.module#ResumoEditPageModule' },
  { path: 'resumo-insert', loadChildren: './resumo-insert/resumo-insert.module#ResumoInsertPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'quiz', loadChildren: './quiz/quiz.module#QuizPageModule' },
  { path: 'quiz-insert', loadChildren: './quiz-insert/quiz-insert.module#QuizInsertPageModule' },
  { path: 'quiz-listar', loadChildren: './quiz-listar/quiz-listar.module#QuizListarPageModule' },
  { path: 'quiz-listar/:conteudo', loadChildren: './quiz-listar/quiz-listar.module#QuizListarPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'cadastre', loadChildren: './cadastre/cadastre.module#CadastrePageModule' },
  { path: 'sala-aula', loadChildren: './sala-aula/sala-aula.module#SalaAulaPageModule' },
  { path: 'resumo', loadChildren: './resumo/resumo.module#ResumoPageModule' },
  { path: 'sala-insert', loadChildren: './sala-insert/sala-insert.module#SalaInsertPageModule' },
  { path: 'sala-insert/:sala-aula', loadChildren: './sala-insert/sala-insert.module#SalaInsertPageModule' },
  { path: 'user-perfil', loadChildren: './user-perfil/user-perfil.module#UserPerfilPageModule' },
  { path: 'sala-home', loadChildren: './sala-home/sala-home.module#SalaHomePageModule' },
  { path: 'sala-home/:sala-aula', loadChildren: './sala-home/sala-home.module#SalaHomePageModule' },
  { path: 'menu-sala', loadChildren: './menu-sala/menu-sala.module#MenuSalaPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
