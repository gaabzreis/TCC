import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'resumo-edit', loadChildren: './resumo-edit/resumo-edit.module#ResumoEditPageModule' },
  { path: 'resumo-edit/:id', loadChildren: './resumo-edit/resumo-edit.module#ResumoEditPageModule' },
  { path: 'resumo-insert', loadChildren: './resumo-insert/resumo-insert.module#ResumoInsertPageModule' },
  { path: 'resumo-insert/:sala-aula', loadChildren: './resumo-insert/resumo-insert.module#ResumoInsertPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'quiz', loadChildren: './quiz/quiz.module#QuizPageModule' },
  { path: 'quiz/:sala-aula', loadChildren: './quiz/quiz.module#QuizPageModule' },
  { path: 'quiz-insert', loadChildren: './quiz-insert/quiz-insert.module#QuizInsertPageModule' },
  { path: 'quiz-insert/:sala-aula', loadChildren: './quiz-insert/quiz-insert.module#QuizInsertPageModule' },
  { path: 'quiz-listar', loadChildren: './quiz-listar/quiz-listar.module#QuizListarPageModule' },
  { path: 'quiz-listar/:conteudo', loadChildren: './quiz-listar/quiz-listar.module#QuizListarPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'cadastre', loadChildren: './cadastre/cadastre.module#CadastrePageModule' },
  { path: 'sala-aula', loadChildren: './sala-aula/sala-aula.module#SalaAulaPageModule' },
  { path: 'resumo', loadChildren: './resumo/resumo.module#ResumoPageModule' },
  { path: 'resumo/:sala-aula', loadChildren: './resumo/resumo.module#ResumoPageModule' },
  { path: 'sala-insert', loadChildren: './sala-insert/sala-insert.module#SalaInsertPageModule' },
  { path: 'sala-insert/:sala-aula', loadChildren: './sala-insert/sala-insert.module#SalaInsertPageModule' },
  { path: 'kanban-home', loadChildren: './kanban/kanban-home/kanban-home.module#KanbanHomePageModule' },
  { path: 'nova-atividade', loadChildren: './kanban/nova-atividade/nova-atividade.module#NovaAtividadePageModule' },
  { path: 'user-perfil', loadChildren: './user-perfil/user-perfil.module#UserPerfilPageModule' },
  { path: 'sala-home', loadChildren: './sala-home/sala-home.module#SalaHomePageModule' },
  { path: 'sala-home/:sala-aula', loadChildren: './sala-home/sala-home.module#SalaHomePageModule' },
  { path: 'menu-sala', loadChildren: './menu-sala/menu-sala.module#MenuSalaPageModule' },
  { path: 'forum', loadChildren: './forum/forum.module#ForumPageModule' },
  { path: 'forum/:sala-aula', loadChildren: './forum/forum.module#ForumPageModule' },
  { path: 'forum-insert', loadChildren: './forum-insert/forum-insert.module#ForumInsertPageModule' },
  { path: 'forum-insert/:sala-aula', loadChildren: './forum-insert/forum-insert.module#ForumInsertPageModule' },
  { path: 'forum-list', loadChildren: './forum-list/forum-list.module#ForumListPageModule' },
  { path: 'forum-list/:sala-aula', loadChildren: './forum-list/forum-list.module#ForumListPageModule' },
  { path: 'resp-insert', loadChildren: './resp-insert/resp-insert.module#RespInsertPageModule' },
  { path: 'resp-insert/:idForum', loadChildren: './resp-insert/resp-insert.module#RespInsertPageModule' },
  { path: 'listar-usuario', loadChildren: './listar-usuario/listar-usuario.module#ListarUsuarioPageModule' },
  { path: 'listar-usuario/:sala-aula', loadChildren: './listar-usuario/listar-usuario.module#ListarUsuarioPageModule' },
  { path: 'detalhes-atividade', loadChildren: './kanban/detalhes-atividade/detalhes-atividade.module#DetalhesAtividadePageModule' },
  { path: 'ranking-sala', loadChildren: './ranking-sala/ranking-sala.module#RankingSalaPageModule' },
  { path: 'ranking-sala/:sala-aula', loadChildren: './ranking-sala/ranking-sala.module#RankingSalaPageModule' },  { path: 'ranking-total', loadChildren: './ranking-total/ranking-total.module#RankingTotalPageModule' },
  { path: 'configurar-notificacao', loadChildren: './configurar-notificacao/configurar-notificacao.module#ConfigurarNotificacaoPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
