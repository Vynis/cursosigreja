import { CursoService } from './../../core/_services/curso.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursoPageRoutingModule } from './curso-routing.module';

import { CursoPage } from './curso.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { CursoMenuComponent } from './curso-menu/curso-menu.component';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursoPageRoutingModule,
    ComponentsModule,
    OrderModule
  ],
  declarations: [CursoPage,CursoMenuComponent],
  providers: [CursoService]
})
export class CursoPageModule {}
