import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EstadosBrasileiros } from 'src/app/core/utils/estados-brasileiros.enum';
import { ConsultaCepService } from 'src/app/core/_services/consulta-cep.service';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { SecurityUtil } from 'src/app/core/utils/security.util';
import { Usuario } from 'src/app/core/_models/usurario.model';
import { UsuarioService } from 'src/app/core/_services/usuario.service';;

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {
  public form: FormGroup;
  listaestadosBrasileiros = EstadosBrasileiros;
  public user: Usuario = null;
  
  constructor(
    public fb: FormBuilder, 
    private cepService: ConsultaCepService,
    private loadCtrl: LoadingController,
    private usuarioService: UsuarioService,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    ) { }

  ngOnInit() {
    this.buscaDadosUsuario();
  }

  async buscaDadosUsuario() {

    const loading = await this.loadCtrl.create({ message: 'Aguarde...' });
    loading.present();

    this.usuarioService.buscaporId(SecurityUtil.getUsuario().id).subscribe( res => {
      loading.dismiss();
      if (res.success){
        this.user = res.dados;
        this.createForm();
      }
    },
    error => {
      loading.dismiss();
    }
    )
  }

  createForm() {
    this.form = this.fb.group({
      cep: [this.user.cep, Validators.required],
			rua: [this.user.rua, Validators.required],
			complemento: [this.user.complemento],
			numero: [this.user.numero],
			bairro: [this.user.bairro, Validators.required],
			cidade: [this.user.cidade, Validators.required],
			estado: [this.user.estado, Validators.required]
    })
  }

  async consultaCEP(){
    const controls = this.form.controls;
    
		if (controls.cep.value != null && controls.cep.value !== ''){

      const loading = await this.loadCtrl.create({ message: 'Consultando o cep...' });
      loading.present();

		  this.cepService.consultaCep(controls.cep.value).subscribe(dados =>{
        loading.dismiss();
        if (!dados)
          return;

        controls.rua.setValue(dados.logradouro);
        controls.complemento.setValue(dados.complemento);
        controls.bairro.setValue(dados.bairro);
        controls.cidade.setValue(dados.localidade);
        controls.estado.setValue(dados.uf);
		  },
      error => {
        loading.dismiss();
      }
      )
		} 

	}

  async submit() {
    if (this.form.invalid)
      return;

    const controls = this.form.controls;
    this.user.cep = controls.cep.value;
    this.user.rua = controls.rua.value;
    this.user.bairro = controls.bairro.value;
    this.user.cidade = controls.cidade.value;
    this.user.estado = controls.estado.value;
    this.user.complemento = controls.complemento.value;
    this.user.numero = controls.numero.value;

    const loading = await this.loadCtrl.create({ message: 'Aguarde...' });
    loading.present();

    this.usuarioService.alterar(this.user).subscribe(
      res => {
        loading.dismiss();

        if (res.success) {
          this.showMessage('Endereço cadastrado com sucesso!');

          if (!SecurityUtil.getUsuario().dadosComp)
            this.navCtrl.navigateRoot('/tablinks/meus-dados/gerais');

        }

      },
      error => {
        loading.dismiss();
      }
    )

  }

  async showMessage(message) {
    const msg = await this.toastCtrl.create({ message: message, duration: 3000 });
    msg.present();
  }


}
