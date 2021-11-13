import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./relatorios/relatorios.module').then(m => m.RelatoriosModule)
  },
  { path: '', redirectTo: 'relatorios', pathMatch: 'full' },
  { path: '**', redirectTo: 'relatorios' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
