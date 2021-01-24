import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoComponent } from './curso.component';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { RouterModule } from '@angular/router';
import { MatDividerModule, MatExpansionModule,MatTabsModule,MatListModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderModule } from 'ngx-order-pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

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
				path: ':id',
				component: CursoComponent
			}
		]),
		OrderModule,
		PdfViewerModule,
		MatProgressSpinnerModule,
		MatSidenavModule,
		MatToolbarModule,
		MatIconModule
	],
	declarations: [CursoComponent]
})
export class CursoModule { }
