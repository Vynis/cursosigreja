import { GeralComponent } from './geral/geral.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  { 
    path: '', 
    component: ReportsComponent,
    children: [
      {
        path: 'geral',
        component: GeralComponent
      },
      {
        path: '',
        redirectTo: 'geral',
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
