import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursoPage } from './curso.page';

const routes: Routes = [
  {
    path: '',
    component: CursoPage
  },
  {
    path: ':id',
    component: CursoPage
  },
  {
    path: ':id/conteudo/:idConteudo',
    component: CursoPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursoPageRoutingModule {}
