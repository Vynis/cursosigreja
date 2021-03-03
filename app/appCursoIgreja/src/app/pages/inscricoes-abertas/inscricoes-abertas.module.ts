import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscricoesAbertasPageRoutingModule } from './inscricoes-abertas-routing.module';

import { InscricoesAbertasPage } from './inscricoes-abertas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscricoesAbertasPageRoutingModule
  ],
  declarations: [InscricoesAbertasPage]
})
export class InscricoesAbertasPageModule {}
