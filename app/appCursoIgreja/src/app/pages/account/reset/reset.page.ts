import { AuthService } from './../../../core/_services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfirmPasswordValidator } from 'src/app/core/utils/confirm-password.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {
  public form: FormGroup;
  codigo: string = '';

  constructor(
    private fb: FormBuilder,
    private routerActive: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    ) { }

  ngOnInit() {
    this.initRegisterForm();
    this.verificaCredenciais();
  }

  async verificaCredenciais() {
    const loading = await this.loadCtrl.create({ message: 'Validados dados...' });
    loading.present();

    this.routerActive.params.subscribe(
      (parans: any) => {
        this.codigo = parans['id'];

        this.authService.validaRecuperacaoSenha(this.codigo).subscribe(
          res => {
            if (!res.success){
              this.navCtrl.navigateRoot('/login');
            }   
            loading.dismiss();      
          },
          error => {
            loading.dismiss();
          }
        )

      }
    );

  }

  async submit()  {

    if (this.form.invalid)
      return;

    const loading = await this.loadCtrl.create({ message: 'Alterando senha...' });
    loading.present();

    this.authService.alterarSenha(this.codigo,this.form.controls.senha.value).subscribe(
      res => {
        if (res.success){
          this.showMessage('Senha alterada com sucesso..');
        }else{
          this.showMessage('Senha não foi alterado. Favor contate nossa equipe de apoio.');
        }
        loading.dismiss();
        this.navCtrl.navigateRoot('/login');
      },
      erro => {
        loading.dismiss();
      }
    );

  }

  initRegisterForm() {
    this.form = this.fb.group({
      senha: ['', [Validators.required]],
      confirmarSenha: ['', [ Validators.required]]
    }, {
      validator: ConfirmPasswordValidator.MatchPassword
    });
  }

  
  async showMessage(message) {
    const msg = await this.toastCtrl.create({ message: message, duration: 3000 });
    msg.present();
  }

}
