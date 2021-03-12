import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { CursosCadastroComponent } from './cursos-cadastro/cursos-cadastro.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbButtonModule, NbCardModule, NbInputModule, NbSelectModule, NbTabsetModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ComponentsModule } from '../components/components.module';
import { CursosService } from '../../@core/services/cursos.service';
import { InterceptService } from '../../@core/utils/intercept.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfessorService } from '../../@core/services/professor.service';
import { DialogConteudosComponent } from './dialog-conteudos/dialog-conteudos.component';
import { ConteudoService } from '../../@core/services/conteudo.service';
import { DialogConteudosCadastroComponent } from './dialog-conteudos-cadastro/dialog-conteudos-cadastro.component';

const routes: Routes = [
	{
		path: '',
		component: CursosComponent,
		children: [
			{
				path: '',
				redirectTo: 'lista',
				pathMatch: 'full'
			},
			{
				path: 'lista',
				component: CursosListaComponent
			},			
			{
				path: 'cadastro',
				component: CursosCadastroComponent
			},
			{
				path: 'cadastro/add',
				component: CursosCadastroComponent,
			},
			{
				path: 'cadastro/edit/:id',
				component: CursosCadastroComponent,
			}
		]
	}
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    NbCardModule,
	NbInputModule,
	NbButtonModule,
	NbSelectModule,
	NbTabsetModule,
	ReactiveFormsModule,
	NbSelectModule,
	ComponentsModule
  ],
  declarations: [
    CursosComponent,
    CursosListaComponent,
    CursosCadastroComponent,
	DialogConteudosComponent,
	DialogConteudosCadastroComponent
  ],
  providers: [
	InterceptService,
	{
		provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
		multi: true
	},
	CursosService,
	ProfessorService
  ]
})
export class CursosModule { }
