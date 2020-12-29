import { RtlScrollAxisType } from '@angular/cdk/platform';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { Usuario } from '../../../../core/auth/_models/usurario.model';
import { AuthNoticeService, Congregacao, InscricaoService } from '../../../../core/auth';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';
import { ConfirmPasswordValidator } from '../register/confirm-password.validator';
import { EstadosBrasileiros } from '../../../../core/utils/estados-brasileiros.enum';
import { ConsultaCepService } from '../../../../core/_base/consulta-cep.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

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
  modoDebug = true;
  formulario: FormGroup;
  usuario: Usuario;
  listaCongregacoes$: Observable<Congregacao[]>;
  listaestadosBrasileiros = EstadosBrasileiros;

  constructor(
	private fb: FormBuilder,
	private localeService: BsLocaleService,
	private inscricaoService: InscricaoService,
	private cepService: ConsultaCepService,
	private authNoticeService: AuthNoticeService
  ) { 
	  this.localeService.use('pt-br');
  }

  ngOnInit() {
	this.carregamentoInicial();
	this.buscarTodasCongregacoesAtivas();
  }

  carregamentoInicial() {
	this.usuario = new Usuario();
	this.createForm();
  }

  createForm() {
	  this.formulario = this.fb.group({
		nome: [this.usuario.nome, [Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
		cpf: [this.usuario.cpf],
		dataNascimento: [this.usuario.dataNascimento, [Validators.required]],
		email: [this.usuario.email],
		telefoneCelular: [this.usuario.telefoneCelular, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9)]],
		telefoneFixo: [this.usuario.telefoneFixo, [ Validators.pattern("^[0-9]*$"), Validators.minLength(8)]],
		tipoAcesso: [this.usuario.tipoAcesso, [Validators.required]],
		senha: [this.usuario.senha, [Validators.required]],
		confirmarSenha: ['', [Validators.required]],
		senhaPadrao: [''],
		stepEndereco: this.fb.group({
			cep: ['', Validators.required],
			rua: ['', Validators.required],
			complemento: [''],
			numero: [''],
			bairro: ['', Validators.required],
			cidade: ['', Validators.required],
			estado: ['', Validators.required]
		}),
		stepOutrasInfo: this.fb.group({
			congregacaoId: [this.usuario.congregacaoId, Validators.required ],
			congregaHaQuantoTempo: [''],
			recebePastoreiro: ['', Validators.required],
			quemPastoreia: [''],
			frequentaCelula: ['', Validators.required],
			quemLider: ['']
		})
	  },{validator: ConfirmPasswordValidator.MatchPassword});
  }

  onChangeTipoAcesso() {
	  if (this.formulario.controls.tipoAcesso.value == 'C'){
		this.formulario.controls['cpf'].setValidators([Validators.required,Validators.minLength(11), Validators.maxLength(11)]);
		this.formulario.controls['email'].clearValidators();
		this.formulario.controls['email'].setValue('');
	  }
	  else{
		this.formulario.controls['email'].setValidators([Validators.required,Validators.email]);
		this.formulario.controls['cpf'].clearValidators();
		this.formulario.controls['cpf'].setValue('');
	  }
		  
	 this.formulario.get('email').updateValueAndValidity();
	 this.formulario.get('cpf').updateValueAndValidity();
  }

  ngAfterViewInit(): void {
		// Initialize form wizard
		const wizard = new KTWizard(this.el.nativeElement, {
			startStep: 1
    });

    
		// Validation before going to next page
		wizard.on('beforeNext', (wizardObj) => {

			this.authNoticeService.setNotice(null);

			switch (wizardObj.currentStep) {
				case 1:
					// if (!this.setpMeusDados())
					// 	wizardObj.stop();
					break;
				case 2:
					// if (!this.setpMeusDados('stepEndereco'))
					// 	wizardObj.stop();
					break;
				default:
					break;
			} 
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
	 this.listaCongregacoes$ = this.inscricaoService.buscarTodasCongregacoes().pipe(
			map( res => {
				return res.dados;
			})
		);
	}

	onChangeSenhaPadrao(){
		if (this.formulario.controls.senhaPadrao.value === true){
			this.formulario.controls['senha'].clearValidators();
			this.formulario.controls['senha'].setValue('@inicio1234');
			this.formulario.controls['confirmarSenha'].clearValidators();
			this.formulario.controls['confirmarSenha'].setValue('@inicio1234');
		}else {
			this.formulario.controls['senha'].setValidators([Validators.required]);
			this.formulario.controls['confirmarSenha'].setValidators([Validators.required]);
			this.formulario.controls['senha'].setValue('');
			this.formulario.controls['confirmarSenha'].setValue('');
		}

		this.formulario.get('senha').updateValueAndValidity();
		this.formulario.get('confirmarSenha').updateValueAndValidity();
	}

	setpMeusDados(step: string = ''): Boolean {
		var validaDados = true;
		const controls = this.formulario.controls;

		if (step === ''){
			Object.keys(controls).forEach(controlName =>{
				if (controlName !== 'stepEndereco')
					if (!controls[controlName].valid){
						controls[controlName].markAsTouched();
						validaDados = false;
					}
						 
			});	
		}
		else  {

			const controls2 = (this.formulario.get(step) as FormArray).controls;

			Object.keys(controls2).forEach(controlName =>{
				if (!controls2[controlName].valid){
					controls2[controlName].markAsTouched();
					validaDados = false;
				}					 
			});				
		}

		if (!validaDados)
			this.authNoticeService.setNotice('Preencher campos obrigatorios','danger');
		
		return validaDados;
	}

	consultaCEP(cep){
    
		if (cep != null && cep !== ''){
		  this.cepService.consultaCep(cep).subscribe(dados =>{
	
			if (!dados){
			  return;
			}
			
			this.formulario.controls.stepEndereco.setValue({
				rua : dados.logradouro,
				complemento: dados.complemento,
				bairro: dados.bairro,
				cidade: dados.localidade,
				estado: dados.uf,
				cep: cep, 
				numero: ''
			});
			
		  })
		} 
	  }


}
