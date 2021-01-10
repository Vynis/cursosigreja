import { RtlScrollAxisType } from '@angular/cdk/platform';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { Usuario } from '../../../../core/auth/_models/usurario.model';
import { AuthNoticeService, AuthService, Congregacao, InscricaoService } from '../../../../core/auth';
import { map } from 'rxjs/internal/operators/map';
import { Observable, of } from 'rxjs';
import { ConfirmPasswordValidator } from '../register/confirm-password.validator';
import { EstadosBrasileiros } from '../../../../core/utils/estados-brasileiros.enum';
import { ConsultaCepService } from '../../../../core/_base/consulta-cep.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { ProcessoInscricaoService } from '../../../../core/processo-inscricao/_services/processoInscricao.service';
import { ProcessoInscricao } from '../../../../core/processo-inscricao/_models/processoInscricao.model';
import { tap } from 'rxjs/internal/operators/tap';
import { InscricaoUsuario } from '../../../../core/inscricao-usuario/_models/inscricaoUsuario.model';
import { InscricaoUsuarioService } from '../../../../core/inscricao-usuario/_services/inscricaoUsuario.service';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { ModeloBase } from '../../../../core/_base/crud/models/modelo-base';
import { GenericValidator } from '../../../../core/utils/generic-validator';

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
  modoDebug = false;
  formulario: FormGroup;
  usuario: Usuario;
  listaCongregacoes$: Observable<Congregacao[]>;
  listaCursosLiberados$: Observable<ProcessoInscricao[]>;
  listaestadosBrasileiros = EstadosBrasileiros;
  inscricaoUsuario: InscricaoUsuario = new InscricaoUsuario();
  token: string = '';
  usuarioValido: boolean = true;

  constructor(
	private fb: FormBuilder,
	private localeService: BsLocaleService,
	private inscricaoService: InscricaoService,
	private cepService: ConsultaCepService,
	private authNoticeService: AuthNoticeService,
	private processoInscricaoService: ProcessoInscricaoService,
	private authService: AuthService,
	private inscricaoUsuarioService: InscricaoUsuarioService,
	private route: ActivatedRoute,
	private router: Router
  ) { 
	  this.localeService.use('pt-br');
  }

  ngOnInit() {
	localStorage.clear();
	this.carregamentoInicial();
  }

  carregamentoInicial() {
	this.buscarTodasCongregacoesAtivas();
	this.buscarTodosCursosLiberados();
	
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
			congregacaoId: [null, Validators.required ],
			congregaHaQuantoTempo: [''],
			recebePastoreiro: [null, Validators.required],
			quemPastoreia: [''],
			frequentaCelula: [null, Validators.required],
			quemLider: ['']
		}),
		stepSelecaoCurso: this.fb.group({
			cursoSelecionado: ['']
		})
	  },{validator: ConfirmPasswordValidator.MatchPassword});
  }

  onChangeTipoAcesso() {
	  if (this.formulario.controls.tipoAcesso.value == 'C'){
		this.formulario.controls['cpf'].setValidators([Validators.required,Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]);
		this.formulario.controls['email'].clearValidators();
		this.formulario.controls['email'].setValue('');
	  }
	  else{
		this.formulario.controls['email'].setValidators([Validators.required,Validators.email ]);
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
	 wizard.on('beforeNext', async (wizardObj) => {

			this.authNoticeService.setNotice(null);

			switch (wizardObj.currentStep) {
				case 1:
					if (!this.setpMeusDados())
						wizardObj.stop();
					if (!this.usuarioValido){
						this.authNoticeService.setNotice('Cpf ou Email já consta cadastrado na base de dados','danger');
						wizardObj.stop();
					}	
					break;
				case 2:
					if (!this.setpMeusDados('stepEndereco'))
						wizardObj.stop();
					break;
				case 3:
					if (!this.setpMeusDados('stepOutrasInfo'))
						wizardObj.stop();
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

	onSubmit(idCurso: number = 0) {
		this.submitted = true;

		if (idCurso !== 0)
			this.formulario.controls.stepSelecaoCurso.setValue({
				cursoSelecionado: idCurso
			})

		if (this.formulario.invalid)
			return;

		this.usuario = this.prepararUsuario();
		this.inscricaoUsuario.id = 0;
		this.inscricaoUsuario.status = 'AG';
		this.inscricaoUsuario.processoInscricaoId = idCurso;

		this.cadastraUsuario(idCurso);
	
	}

	private cadastraUsuario(idCurso: number) {
		this.inscricaoService.cadastrar(this.usuario).subscribe(
			res => {

				if (res.dados) {
					if (res.success) {
						let dadosCadastrados = res.dados;

						if (idCurso !== 0) {
							this.inscricaoUsuario.usuarioId = dadosCadastrados.id;
							this.autenticaUsuario();
						} else {
							Swal.fire({
								title: 'Seu cadastro foi realizado com sucesso',
								text: 'Realize o login para ter acesso a nossa plataforma.',
								icon: 'success',
								confirmButtonText: 'Login',
								allowOutsideClick: false
							}).then((result: any) => {
								if (result.value) {
									this.redirecinaPaginaInicial();
								}
							});
						}
					}
					else {
						this.authNoticeService.setNotice(res.dados, 'danger');
					}
				}

			}, (err) => {
				console.log(err);
				this.redirecinaPaginaInicial();
			}
		);
	}

	private autenticaUsuario() {
		this.authService.login(this.usuario.email === '' ? this.usuario.cpf : this.usuario.email, this.usuario.senha).subscribe(
			res => {
				if (res.success) {
					let dadosLogin = res.dados;
					this.token = dadosLogin.token;

					this.cadastraInscricaoUsuario(dadosLogin);
				}
				else {
					this.authNoticeService.setNotice(res.dados, 'danger');
				}
			} , ( erro => this.redirecinaPaginaInicial() )
		);
	}

	private cadastraInscricaoUsuario(dadosLogin: any) {
		this.inscricaoUsuarioService.cadastrar(this.inscricaoUsuario, dadosLogin.token).subscribe(
			res => {
				if (res.success) {
					let dadosInscriccao = res.dados;
					this.inscricaoUsuario.id = dadosInscriccao.id;
					this.inscricaoUsuario.processoInscricaoId = dadosInscriccao.processoInscricaoId;
					this.inscricaoUsuario.usuarioId = dadosInscriccao.usuarioId;
					
					if (dadosInscriccao.processoInscricao.tipo === 'G' ){

						Swal.fire({
							title: 'Seu cadastro foi realizado com sucesso',
							text: 'Realize o login para ter acesso a nossa plataforma.',
							icon: 'success',
							confirmButtonText: 'Login',
							allowOutsideClick: false
						}).then((result: any) => {
							if (result.value) {
								this.redirecinaPaginaInicial();
							}
						});

					}
					else
						this.geraPagamentoInscricao();
				}
				else {
					this.authNoticeService.setNotice(res.dados, 'danger');
				}
			}, ( erro => this.redirecinaPaginaInicial() )
		);
	}

	private geraPagamentoInscricao() {
		Swal.fire({
			title: 'Seu cadastro foi realizado com sucesso',
			text: 'Qual proximo passo?',
			icon: 'success',
			showCancelButton: true,
			confirmButtonText: 'Realizar pagamento',
			cancelButtonText: "Realizar o login",
			reverseButtons: true,
			allowOutsideClick: false
		}).then((result: any) => {
			if (result.value) {
				this.authNoticeService.setNotice('Aguarde.. Abrindo ambiente de pagamento.','primary');
				this.inscricaoUsuarioService.gerarPagamento(this.inscricaoUsuario.id, this.token).subscribe(
					res => {
						if (res.success) {

							window.open(res.dados, '_blank');	

							Swal.fire({
								title: 'O pagamento foi gerado com sucesso',
								icon: 'success',
								confirmButtonText: 'Acessar login',
								allowOutsideClick: false,
								html : `Caso a página de pagamento não foi aberta pelo seu navegador <a href=\'${res.dados}\'  target="_blank"  >clique aqui.</a>`
							}).then((result: any) => { 
								this.authNoticeService.setNotice(null);
								this.redirecinaPaginaInicial();
							});
						}
						else {
							this.authNoticeService.setNotice(null);
							this.authNoticeService.setNotice('Erro ao gerar o pagamento','danger');
						}
					},  ( erro => this.redirecinaPaginaInicial() )
				);
			}
			else {
				this.authNoticeService.setNotice(null);
				this.redirecinaPaginaInicial();
			}
		}).catch( () => this.redirecinaPaginaInicial() );
	}

	 redirecinaPaginaInicial() {
		this.router.navigateByUrl("/auth/login");
	}

	private prepararUsuario() {
		const controls = this.formulario.controls;
		const _usuario: Usuario = new Usuario();

		_usuario.nome = controls.nome.value;
		_usuario.email = controls.email.value;
		_usuario.senha = controls.senha.value;
		_usuario.status = 'A';
		_usuario.cpf = controls.cpf.value;
		_usuario.dataNascimento = controls.dataNascimento.value;
		_usuario.rua = controls.stepEndereco.get('rua').value;
		_usuario.complemento = controls.stepEndereco.get('complemento').value;
		_usuario.bairro = controls.stepEndereco.get('bairro').value;
		_usuario.cidade = controls.stepEndereco.get('cidade').value;
		_usuario.estado = controls.stepEndereco.get('estado').value;
		_usuario.numero = controls.stepEndereco.get('numero').value;
		_usuario.cep = controls.stepEndereco.get('cep').value;
		_usuario.telefoneCelular = controls.telefoneCelular.value;
		_usuario.telefoneFixo = controls.telefoneFixo.value;
		_usuario.tipoAcesso = controls.tipoAcesso.value;

		_usuario.congregacaoId = controls.stepOutrasInfo.get('congregacaoId').value;
		_usuario.congregaHaQuantoTempo = controls.stepOutrasInfo.get('congregaHaQuantoTempo').value;
		_usuario.recebePastoreiro = controls.stepOutrasInfo.get('recebePastoreiro').value;
		_usuario.quemPastoreia = controls.stepOutrasInfo.get('quemPastoreia').value;
		_usuario.frequentaCelula = controls.stepOutrasInfo.get('frequentaCelula').value;
		_usuario.quemLider = controls.stepOutrasInfo.get('quemLider').value;
		return _usuario;
	}

	buscarTodasCongregacoesAtivas() {
	 this.listaCongregacoes$ = this.inscricaoService.buscarTodasCongregacoes().pipe(
			map( res => {
				return res.dados;
			})
		);
	}

	buscarTodosCursosLiberados() {
		this.listaCursosLiberados$ = this.processoInscricaoService.buscarCursosLiberados().pipe(
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
				if (controlName !== 'stepEndereco' && controlName !== 'stepOutrasInfo')
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

	  async onKeyValidaDadosUsuario() {
		if (this.formulario.controls.tipoAcesso.value == 'C'){
			if (this.formulario.controls.cpf.valid) 
			 await this.ValidaDadosUsuarioService(this.formulario.controls.cpf.value);
		} else {
			if (this.formulario.controls.email.valid) 
			 await this.ValidaDadosUsuarioService(this.formulario.controls.email.value);
		}
	  }

	  async ValidaDadosUsuarioService(emailOuCpf: string) {
		const responseApi  =  await this.authService.verificaUsuario(emailOuCpf).toPromise();

		this.usuarioValido = responseApi.success;

		this.authNoticeService.setNotice(null);

		if (!responseApi.success) {
			this.authNoticeService.setNotice('Cpf ou Email já consta cadastrado na base de dados','danger');
		}
	  }
}
