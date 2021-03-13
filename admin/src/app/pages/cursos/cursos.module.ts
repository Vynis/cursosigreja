import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { CursosCadastroComponent } from './cursos-cadastro/cursos-cadastro.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbAlertModule, NbButtonModule, NbCardModule, NbInputModule, NbSelectModule, NbTabsetModule } from '@nebular/theme';
import { ComponentsModule } from '../components/components.module';
import { CursosService } from '../../@core/services/cursos.service';
import { InterceptService } from '../../@core/utils/intercept.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfessorService } from '../../@core/services/professor.service';
import { ConteudosComponent } from './conteudos-lista/conteudos-lista.component';
import { ConteudosCadastroComponent } from './conteudos-cadastro/conteudos-cadastro.component';
import { ConteudoService } from '../../@core/services/conteudo.service';
import { ModuloService } from '../../@core/services/modulo.service';
import { ProvasListaComponent } from './provas-lista/provas-lista.component';
import { ProvasCadastroComponent } from './provas-cadastro/provas-cadastro.component';
import { ProvaService } from '../../@core/services/prova.service';

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
			},
			{
				path: 'conteudos/:idCurso',
				component: ConteudosComponent,
			},
			{
				path: 'conteudos/cadastro/add/:idCurso',
				component: ConteudosCadastroComponent,
			},
			{
				path: 'conteudos/cadastro/edit/:id/:idCurso',
				component: ConteudosCadastroComponent,
			},
			{
				path: 'provas/:idConteudo',
				component: ProvasListaComponent,
			},
			{
				path: 'provas/cadastro/add/:idConteudo',
				component: ProvasCadastroComponent,
			},
			{
				path: 'provas/cadastro/edit/:id/:idConteudo',
				component: ProvasCadastroComponent,
			},
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
	ComponentsModule,
	NbAlertModule
  ],
  declarations: [
    CursosComponent,
    CursosListaComponent,
    CursosCadastroComponent,
	ConteudosComponent,
	ConteudosCadastroComponent,
	ProvasListaComponent,
	ProvasCadastroComponent
  ],
  providers: [
	InterceptService,
	{
		provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
		multi: true
	},
	CursosService,
	ProfessorService,
	ConteudoService,
	ModuloService,
	ProvaService
  ]
})
export class CursosModule { }
