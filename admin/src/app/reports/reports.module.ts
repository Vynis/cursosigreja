import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../@theme/theme.module';
import { NbButtonModule, NbCardModule, NbInputModule, NbSelectModule, NbTabsetModule } from '@nebular/theme';
import { GeralComponent } from './geral/geral.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ProcessoInscricaoService } from '../@core/services/processo-inscricao.service';
import { RelatorioService } from '../@core/services/relatorio.service';


@NgModule({
  declarations: [
    ReportsComponent,
    GeralComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    FormsModule,
    RouterModule,
    ThemeModule,
    NbTabsetModule ,
    Ng2SmartTableModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    ReactiveFormsModule
  ],
  providers: [
    ProcessoInscricaoService,
    RelatorioService
  ]
})
export class ReportsModule { }
