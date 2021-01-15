import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoComponent } from './curso.component';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { RouterModule } from '@angular/router';
import { MatDividerModule, MatExpansionModule,MatTabsModule,MatListModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		MatExpansionModule,
		MatDividerModule,
		MatTabsModule,
		MatListModule,
		CoreModule,
		NgbModule,
		RouterModule.forChild([
			{
				path: '',
				component: CursoComponent
			},
		]),
	],
	declarations: [CursoComponent]
})
export class CursoModule { }
