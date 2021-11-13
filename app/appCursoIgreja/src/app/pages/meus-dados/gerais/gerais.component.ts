import { Congregacao } from './../../../core/_models/congregacao.model';
import { SecurityUtil } from './../../../core/utils/security.util';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ConsultaCepService } from 'src/app/core/_services/consulta-cep.service';
import { UsuarioService } from 'src/app/core/_services/usuario.service';
import { Usuario } from 'src/app/core/_models/usurario.model';
import { CongregacaoService } from 'src/app/core/_services/congregracao.service';

@Component({
  selector: 'app-gerais',
  templateUrl: './gerais.component.html',
  styleUrls: ['./gerais.component.scss']
})
export class GeraisComponent implements OnInit {
  form: FormGroup;
  public user: Usuario = null;
  listaCongregacoes: Congregacao[];

  constructor(
    public fb: FormBuilder, 
    private loadCtrl: LoadingController,
    private usuarioService: UsuarioService,
    private toastCtrl: ToastController,
    private congregacaoService: CongregacaoService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.buscarCongrecoesAtivas();
    this.buscaDadosUsuario();
  }

  buscarCongrecoesAtivas() {
    this.congregacaoService.buscarTodasCongregacoes().subscribe(
      res => {
        this.listaCongregacoes = res.dados;
      }
    )
  }

  createForm() {
    this.form = this.fb.group({
      congregacaoId: [this.user.congregacaoId, Validators.required ],
			congregaHaQuantoTempo: [this.user.congregaHaQuantoTempo],
			recebePastoreiro: [this.user.recebePastoreiro, Validators.required],
			quemPastoreia: [this.user.quemPastoreia],
			frequentaCelula: [this.user.frequentaCelula, Validators.required],
			quemLider: [this.user.quemLider]
    })
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

  async submit() {
    
    if (this.form.invalid)
      return;

    const controls = this.form.controls;
  
    if (controls.congregacaoId.value === 0  || controls.congregacaoId.value === null){
      this.showMessage('Selecione uma congregação!');
      return;
    }

    
    this.user.congregacaoId = controls.congregacaoId.value;
    this.user.congregaHaQuantoTempo = controls.congregaHaQuantoTempo.value;
    this.user.recebePastoreiro = controls.recebePastoreiro.value;
    this.user.quemPastoreia = controls.quemPastoreia.value;
    this.user.frequentaCelula = controls.frequentaCelula.value;
    this.user.quemLider = controls.quemLider.value;

    const loading = await this.loadCtrl.create({ message: 'Aguarde...' });
    loading.present();

    this.usuarioService.alterar(this.user).subscribe(
      res => {
        loading.dismiss();

        if (res.success) {
          this.showMessage('Cadastrado com sucesso!');

          if (!SecurityUtil.getUsuario().dadosComp) {
            this.user.dadosComp = true;
            SecurityUtil.setUsuario(this.user);
            this.navCtrl.navigateRoot('/tablinks/home');
            setTimeout(() => {
              location.reload();
            }, 3000);
            
          }

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
