import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscricoesAbertasPage } from './inscricoes-abertas.page';

const routes: Routes = [
  {
    path: '',
    component: InscricoesAbertasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscricoesAbertasPageRoutingModule {}
