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
import Swal from 'sweetalert2'
import { ModeloBase } from '../../../core/_base/crud/models/modelo-base';
import { ProcessoInscricaoService } from '../../../core/processo-inscricao/_services/processoInscricao.service';
import { ProcessoInscricao } from '../../../core/processo-inscricao/_models/processoInscricao.model';
import { Router } from '@angular/router';

@Component({
	selector: 'kt-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	widget4_1: Widget4Data;
	listaInscricaoCurso$: Observable<InscricaoUsuario[]>;
	listaProcessoInscricaoDisponivel$ : Observable<ProcessoInscricao[]>
	dataAtual: Date = new Date();


	constructor(
		private layoutConfigService: LayoutConfigService,
		private inscricaoUsuarioService: InscricaoUsuarioService,
		private processoInscricaoService: ProcessoInscricaoService,
		private router: Router
		) {
	}

	ngOnInit(): void {
		this.carregamentoInicial();
	}

	carregamentoInicial() {
		this.buscarMinhasInscoes();
		this.buscarCursosDisponiveis();
	}

	buscarMinhasInscoes() {
		this.listaInscricaoCurso$ = this.inscricaoUsuarioService.buscaCursoIsncrito().pipe(
			map( res => {
				let dados = res.dados;
				dados.forEach(element => {
					element.processoInscricao.dataFinal = new Date(element.processoInscricao.dataFinal);
					element.processoInscricao.dataInicial = new Date(element.processoInscricao.dataInicial);
					element.processoInscricao.dataInicalPagto = new Date(element.processoInscricao.dataInicalPagto);
					element.processoInscricao.dataFinalPagto = new Date(element.processoInscricao.dataFinalPagto);
				});
				return dados;
			})
		)
	}

	buscarCursosDisponiveis() {
		this.listaProcessoInscricaoDisponivel$ = this.processoInscricaoService.buscarCursosDisponivel().pipe(
			map(
				res => {
					return res.dados;
				}
			)
		)
	}

	gerarPagamento(inscricao: InscricaoUsuario) {
		if (inscricao.transacaoInscricoes){
			if (inscricao.transacaoInscricoes.length > 0){
				this.inscricaoUsuarioService.buscaTransacao(inscricao.transacaoInscricoes[0].codigo).subscribe(
					res => {
						if (res.success) {
							this.mensagemTransacao(res);
						}
					}
				)
			} else {
				this.inscricaoUsuarioService.gerarPagamentoSemToken(inscricao.id).subscribe(
					res => {
						if (res.success) {
							this.mensagemTransacao(res);
						}
					}
				);
			}
		} else {
			this.inscricaoUsuarioService.gerarPagamentoSemToken(inscricao.id).subscribe(
				res => {
					if (res.success) {
						this.mensagemTransacao(res);
					}
				}
			);
		}

	}

	private mensagemTransacao(res: ModeloBase) {
		window.open(res.dados, '_blank');

		Swal.fire({
			title: 'O pagamento foi gerado com sucesso',
			icon: 'success',
			confirmButtonText: 'OK',
			allowOutsideClick: false,
			html: `Caso a página de pagamento não foi aberta pelo seu navegador <a href=\'${res.dados}\'  target="_blank"  >clique aqui.</a>`
		}).then((result: any) => {
			location.reload();
		});
	}

	inscrever(id: number) {
		var inscricaoUsuario = new InscricaoUsuario();
		inscricaoUsuario.processoInscricaoId = id;
		inscricaoUsuario.status = 'AG';

		Swal.fire({
			title: 'Tem certeza que deseja se inscrever para este curso',
			text: '',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Sim',
			cancelButtonText: "Não",
			reverseButtons: false,
			allowOutsideClick: false
		}).then((result: any) => { 
			if (result.value) {
				this.inscreverUsuario(inscricaoUsuario);
			}
		});

	}

	private inscreverUsuario(inscricaoUsuario: InscricaoUsuario) {
		this.inscricaoUsuarioService.cadastrarSemToken(inscricaoUsuario).subscribe(
			res => {
				if (res.success) {
					let dados = res.dados;

					if (dados.processoInscricao.tipo === 'P') {
						this.gerarPagamento(dados);
					}
					else {
						Swal.fire({
							title: 'Inscrição realizada com sucesso',
							icon: 'success',
							confirmButtonText: 'OK',
							allowOutsideClick: false,
							html: `Parabéns sua incrição foi realizado com sucesso. Vamos iniciar o curso...`
						}).then((result: any) => {
							location.reload();
						});

					}

				}
			}
		);
	}


	cancelarInscricao(id: number) {
		Swal.fire({
			title: 'Tem certeza que deseja cancelar sua inscrição',
			text: 'Caso cancele poderá efetuar inscrição novamente se estiver dentre os prazos.',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Sim',
			cancelButtonText: "Não",
			reverseButtons: false,
			allowOutsideClick: false
		}).then((result: any) => { 
			if (result.value) {
				this.inscricaoUsuarioService.cancelarInscricao(id).subscribe(
					res => {
						if (res.success) {
							Swal.fire({
								title: 'Inscrição cancelada com sucesso',
								icon: 'success',
								confirmButtonText: 'OK',
								allowOutsideClick: false,
								html: ``
							}).then((result: any) => {
								location.reload();
							});
						}
					}
				)
			}
		});
	}
}
