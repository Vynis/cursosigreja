import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusCursosPage } from './meus-cursos.page';

const routes: Routes = [
  {
    path: '',
    component: MeusCursosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusCursosPageRoutingModule {}
