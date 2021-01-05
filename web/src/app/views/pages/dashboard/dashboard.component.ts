// Angular
import { Component, OnInit } from '@angular/core';
// Lodash
import { shuffle } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { InscricaoUsuario } from '../../../core/inscricao-usuario/_models/inscricaoUsuario.model';
import { InscricaoUsuarioService } from '../../../core/inscricao-usuario/_services/inscricaoUsuario.service';
// Services
// Widgets model
import { LayoutConfigService, SparklineChartOptions } from '../../../core/_base/layout';
import { Widget4Data } from '../../partials/content/widgets/widget4/widget4.component';

@Component({
	selector: 'kt-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	widget4_1: Widget4Data;
	listaInscricaoCurso$: Observable<InscricaoUsuario[]>;


	constructor(
		private layoutConfigService: LayoutConfigService,
		private inscricaoUsuarioService: InscricaoUsuarioService) {
	}

	ngOnInit(): void {

		this.buscarMinhasInscoes();

		// @ts-ignore
		this.widget4_1 = shuffle([
			{
				//pic: './assets/media/files/doc.svg',
				title: 'Nova Criatura',
				desc: 'Descricao do curso',
				url: 'https://keenthemes.com.my/metronic',
			}, {
				//pic: './assets/media/files/jpg.svg',
				title: 'Familia Cristã',
				desc: 'Descricao do curso',
				url: 'https://keenthemes.com.my/metronic',
			}, {
				//pic: './assets/media/files/pdf.svg',
				title: 'Full Developer Manual For 4.7',
				desc: 'Descricao do curso',
				url: 'https://keenthemes.com.my/metronic',
			}, {
				//pic: './assets/media/files/javascript.svg',
				title: 'Make JS Development',
				desc: 'Descricao do curso',
				url: 'https://keenthemes.com.my/metronic',
			}, {
				//pic: './assets/media/files/zip.svg',
				title: 'Download Ziped version OF 5.0',
				desc: 'Descricao do curso',
				url: 'https://keenthemes.com.my/metronic',
			}, {
				//pic: './assets/media/files/pdf.svg',
				title: 'Finance Report 2016/2017',
				desc: 'Descricao do curso',
				url: 'https://keenthemes.com.my/metronic',
			},
		]);


	}

	buscarMinhasInscoes() {
		this.listaInscricaoCurso$ = this.inscricaoUsuarioService.buscaCursoIsncrito().pipe(
			map( res => {
				return res.dados;
			})
		)
	}
}
