import { UsuarioService } from 'src/app/core/_services/usuario.service';
import { EnderecoComponent } from './endereco/endereco.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusDadosPageRoutingModule } from './meus-dados-routing.module';

import { MeusDadosPage } from './meus-dados.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ConsultaCepService } from 'src/app/core/_services/consulta-cep.service';
import { GeraisComponent } from './gerais/gerais.component';
import { CongregacaoService } from 'src/app/core/_services/congregracao.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusDadosPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [MeusDadosPage,EnderecoComponent,GeraisComponent],
  providers: [ConsultaCepService, UsuarioService,CongregacaoService]
})
export class MeusDadosPageModule {}
