import { UsuarioService } from './../../../core/_services/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/core/_models/usurario.model';
import { ConfirmPasswordValidator } from 'src/app/core/utils/confirm-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  constructor(
    public fb: FormBuilder,
    private toastCtrl: ToastController,
    private usuarioService: UsuarioService,
    private loadCtrl: LoadingController,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      telefoneCelular: ['', [ Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8)]],
      telefoneFixo: ['', [ Validators.pattern("^[0-9]*$"), Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      confirmarSenha: ['', Validators.required]
    }, {
      validator: ConfirmPasswordValidator.MatchPassword
    });
    
  }

  prepararModel() : Usuario {
    const controls = this.form.controls;

    const _usuario = new Usuario();

    _usuario.id = 0
    _usuario.nome = controls.nome.value;
    _usuario.dataNascimento = controls.dataNascimento.value;
    _usuario.dataNascimento = controls.dataNascimento.value;
    _usuario.email = controls.email.value;
    _usuario.telefoneCelular = controls.telefoneCelular.value;
    _usuario.telefoneFixo = controls.telefoneFixo.value;
    _usuario.senha = controls.senha.value;
    _usuario.tipoAcesso = 'E';

    return _usuario;
  }

  async submit() {
    if (this.form.invalid)
      return;
  
      const loading = await this.loadCtrl.create({ message: 'Realizando o cadastro...' });
      loading.present();

      const usuario = this.prepararModel();

      this.usuarioService.cadastrar(usuario).subscribe(
        res => {
          if (!res.success){
            loading.dismiss();
            this.showMessage(res.dados);
            return;
          }
          this.showMessage('Parabéns.. Cadastro realizado com sucesso!');
          this.navCtrl.navigateRoot('/login');
          loading.dismiss();
        },
        err =>{
          loading.dismiss();
        }
      )
      
  }

  async showMessage(message) {
    const msg = await this.toastCtrl.create({ message: message, duration: 3000 });
    msg.present();
  }


}
