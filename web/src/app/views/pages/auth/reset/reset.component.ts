import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthNoticeService, AuthService } from '../../../../core/auth';
import { ConfirmPasswordValidator } from '../register/confirm-password.validator';

@Component({
  selector: 'kt-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  codigo: string = '';

  constructor(
    private routerActive: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public authNoticeService: AuthNoticeService,
    public authService: AuthService) { }

  ngOnInit() {
    this.initRegisterForm();

    this.routerActive.params.subscribe(
      (parans: any) => {
        this.codigo = parans['id'];
        this.authService.validaRecuperacaoSenha(this.codigo).subscribe(
          res => {
            if (!res.success){
              this.authNoticeService.setNotice('Dados invalidos..', 'danger');
              this.router.navigateByUrl("/auth/login");
            }         
          }
        )

      }
    );
  }

  initRegisterForm() {
    this.registerForm = this.fb.group({
      senha: ['', [Validators.required]],
      confirmarSenha: ['', [ Validators.required]]
    }, {
      validator: ConfirmPasswordValidator.MatchPassword
    });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.registerForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  submit() {
		const controls = this.registerForm.controls;

		// check form
		if (this.registerForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;

    this.authService.alterarSenha(this.codigo,controls.senha.value).subscribe(
      res => {
        if (res.success){
          this.authNoticeService.setNotice('Senha alterada com sucesso..', 'success');
        }else{
          this.authNoticeService.setNotice('Senha não foi alterado. Favor contate nossa equipe de apoio.', 'danger');
        }
        this.router.navigateByUrl("/auth/login");
        this.loading = false;
      }
    )

  }

}
