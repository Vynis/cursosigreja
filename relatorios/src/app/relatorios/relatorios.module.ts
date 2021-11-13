import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatoriosComponent } from './relatorios.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { RouterModule, Routes } from '@angular/router';
import { AndamentoAlunoComponent } from './andamento-aluno/andamento-aluno.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';


const routes: Routes = [
  {
    path: '',
    component: RelatoriosComponent,
    children: [
      {
        path: 'andamento',
        component: AndamentoAlunoComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    MatTableExporterModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatTableModule,
    MatButtonModule
  ],
  declarations: [
    RelatoriosComponent,
    AndamentoAlunoComponent
  ]
})
export class RelatoriosModule { }
