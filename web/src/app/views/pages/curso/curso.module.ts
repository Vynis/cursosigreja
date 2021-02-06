import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoComponent } from './curso.component';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { RouterModule } from '@angular/router';
import { MatDividerModule, MatExpansionModule,MatTabsModule,MatListModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderModule } from 'ngx-order-pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatVideoModule } from 'mat-video';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmbedVideo } from 'ngx-embed-video';


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
		MatProgressSpinnerModule,
		MatSidenavModule,
		MatToolbarModule,
		MatIconModule,
		MatVideoModule,
		MatCheckboxModule,
		MatRadioModule,
		FormsModule,
		ReactiveFormsModule,
		EmbedVideo
	],	
	declarations: [CursoComponent]
})
export class CursoModule { }
