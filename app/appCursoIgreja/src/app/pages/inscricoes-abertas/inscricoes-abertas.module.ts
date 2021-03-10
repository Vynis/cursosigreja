import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscricoesAbertasPageRoutingModule } from './inscricoes-abertas-routing.module';

import { InscricoesAbertasPage } from './inscricoes-abertas.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ProcessoInscricaoService } from 'src/app/core/_services/processoInscricao.service';
import { InscricaoUsuarioService } from 'src/app/core/_services/inscricaoUsuario.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscricoesAbertasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [InscricoesAbertasPage],
  providers: [ProcessoInscricaoService,InscricaoUsuarioService]
})
export class InscricoesAbertasPageModule {}
