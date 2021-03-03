import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusCursosPageRoutingModule } from './meus-cursos-routing.module';

import { MeusCursosPage } from './meus-cursos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusCursosPageRoutingModule
  ],
  declarations: [MeusCursosPage]
})
export class MeusCursosPageModule {}
