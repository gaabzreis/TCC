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
  { path: 'forum', loadChildren: './forum/forum.module#ForumPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'cadastre', loadChildren: './cadastre/cadastre.module#CadastrePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
