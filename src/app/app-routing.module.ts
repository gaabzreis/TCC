import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomePageModule', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', pathMatch: 'full' },
  { path: 'resumo-edit', loadChildren: './resumo-edit/resumo-edit.module#ResumoEditPageModule' },
  { path: 'resumo-edit/:id', loadChildren: './resumo-edit/resumo-edit.module#ResumoEditPageModule' },
  { path: 'resumo-insert', loadChildren: './resumo-insert/resumo-insert.module#ResumoInsertPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
