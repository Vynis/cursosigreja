import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EstadosBrasileiros } from 'src/app/core/utils/estados-brasileiros.enum';
import { ConsultaCepService } from 'src/app/core/_services/consulta-cep.service';
import { LoadingController } from '@ionic/angular';
import { SecurityUtil } from 'src/app/core/utils/security.util';
import { Usuario } from 'src/app/core/_models/usurario.model';

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
    ) { }

  ngOnInit() {
    this.createForm();
    this.user = SecurityUtil.getUsuario();
  }

  createForm() {
    this.form = this.fb.group({
      cep: ['', Validators.required],
			rua: ['', Validators.required],
			complemento: [''],
			numero: [''],
			bairro: ['', Validators.required],
			cidade: ['', Validators.required],
			estado: ['GO', Validators.required]
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

}
