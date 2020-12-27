import { RtlScrollAxisType } from '@angular/cdk/platform';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { Usuario } from '../../../../core/auth/_models/usurario.model';
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
  public listaCongrecoes: Congregacao[] = [];
  usuario: Usuario;
  teste: any;
 

  constructor(
	private fb: FormBuilder,
	private localeService: BsLocaleService,
	private inscricaoService: InscricaoService
  ) { 
	  this.localeService.use('pt-br');
	  this.buscarTodasCongregacoesAtivas();
  }

  ngOnInit() {
	this.carregamentoInicial();
  }

  carregamentoInicial() {
	this.usuario = new Usuario();
	this.createForm();
  }

  createForm() {
	  this.formulario = this.fb.group({
		nome: [this.usuario.nome, [Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
		cpf: [this.usuario.cpf,  [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
		dataNascimento: [this.usuario.dataNascimento, [Validators.required]],
		email: [this.usuario.email, [Validators.required, Validators.email]],
		telefoneCelular: [this.usuario.telefoneCelular, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9)]],
		telefoneFixo: [this.usuario.telefoneFixo, [ Validators.pattern("^[0-9]*$"), Validators.minLength(8)]],
		congregacaoId: [this.usuario.congregacaoId, Validators.required ]
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
		

		//this.listaCongrecoes = lista;
	}
}
