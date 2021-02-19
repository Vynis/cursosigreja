import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridViewComponent } from './grid-view/grid-view.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTooltipModule,
    MatSortModule
  ],
  declarations: [GridViewComponent],
  exports: [GridViewComponent]
})
export class ComponentsModule { }
