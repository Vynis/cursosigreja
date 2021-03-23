import { EnderecoComponent } from './endereco/endereco.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusDadosPage } from './meus-dados.page';
import { GeraisComponent } from './gerais/gerais.component';

const routes: Routes = [
  {
    path: '',
    component: MeusDadosPage
  },
  {
    path: 'endereco',
    component: EnderecoComponent
  },
  {
    path: 'gerais',
    component: GeraisComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusDadosPageRoutingModule {}
