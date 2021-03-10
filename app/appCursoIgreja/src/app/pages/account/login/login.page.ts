import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { SecurityUtil } from 'src/app/core/utils/security.util';
import { AuthService } from 'src/app/core/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public hide = true;
  public form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private authService: AuthService
  ) { 
		this.form = this.fb.group({
			email: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(320)
			])
			],
			password: ['', Validators.required]
		});
  }

  ngOnInit() {
  }

  toggleHide() {
    this.hide = !this.hide;
  }

  async submit() {

    if (this.form.invalid)
      return;

    const loading = await this.loadCtrl.create({ message: 'Autenticando...' });
    loading.present();

    const controls = this.form.controls;

    const authData = {
			email: controls.email.value,
			password: controls.password.value
		};

    this.authService.login(authData.email,authData.password).subscribe(
      res => {
        if (res.success) { 
          SecurityUtil.set(res.dados);
          this.navCtrl.navigateRoot('/');
        } else {
          this.showError('Login inválido. Email/Cpf ou Senha estão incorreto!');
        }
        loading.dismiss();
      },
      err => {
        this.showError('Login inválido. Email/Cpf ou Senha estão incorreto!');
        loading.dismiss();
      }
    );

  }

  async showError(message) {
    const error = await this.toastCtrl.create({ message: message, duration: 3000 });
    error.present();
  }

  async resetPassword() {
    if (this.form.controls['email'].invalid) {
      this.showError("Email/CPF inválido");
      return;
    }

    const loading = await this.loadCtrl.create({ message: 'Restaurando sua senha...' });
    loading.present();

    this.authService.requestPassword(this.form.controls['email'].value).pipe(
			tap(response => {
        loading.dismiss();
				if (response.success) {
					if (response.dados.possuiEmail)
						this.showError('Email enviado com sucesso!');
					else
						this.showError('Foi enviado um solicitação para email de nossa equipe. Em breve entraremos em contato.');
				} else {
					this.showError('Não existe Email/Cpf cadastrado em nossa base de dados.');
				}
			}),
			finalize(() => {
        loading.dismiss();
			})
		).subscribe();
  }

}
