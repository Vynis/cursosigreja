import { RtlScrollAxisType } from '@angular/cdk/platform';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { Congregacao, InscricaoService } from '../../../../core/auth';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'kt-inscricao',
  templateUrl: './inscricao.component.html',
  styleUrls: ['./inscricao.component.scss']
})
export class InscricaoComponent implements OnInit, AfterViewInit {

  @ViewChild('wizard', {static: true}) el: ElementRef;
  submitted = false;
  exiteErro = false;
  formulario: FormGroup;
  listaCongrecoes: Congregacao[] = [];
 

  constructor(
	private fb: FormBuilder,
	private localeService: BsLocaleService,
	private inscricaoService: InscricaoService
  ) { 
	  this.localeService.use('pt-br');
  }

  ngOnInit() {
	this.carregamentoInicial();
  }

  carregamentoInicial() {
	this.createForm();
	this.buscarTodasCongregacoesAtivas();
  }

  createForm() {
	  this.formulario = this.fb.group({
		nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
		cpf: ['',  [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
		dataNascimento: ['', [Validators.required]],
		email: ['', [Validators.required, Validators.email]],
		telefoneCelular: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9)]],
		telefoneFixo: ['', [ Validators.pattern("^[0-9]*$"), Validators.minLength(8)]],
		congregacaoId: ['', Validators.required ]
	  });
  }

  ngAfterViewInit(): void {
		// Initialize form wizard
		const wizard = new KTWizard(this.el.nativeElement, {
			startStep: 1
    });

    
		// Validation before going to next page
		wizard.on('beforeNext', (wizardObj) => {
			// https://angular.io/guide/forms
			// https://angular.io/guide/form-validation

      // validate the form and use below function to stop the wizard's step
		  //	 wizardObj.stop();
		});

		// Change event
		wizard.on('change', () => {
			setTimeout(() => {
				KTUtil.scrollTop();
			}, 500);
		});
	}

	onSubmit() {
		this.submitted = true;

	}

	buscarTodasCongregacoesAtivas() {
		this.inscricaoService.buscarTodasCongregacoes().subscribe(res  => {
			if (res.success){
				this.listaCongrecoes = res.dados;
			}
		})
	}
}
