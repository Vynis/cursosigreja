import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { TipoConteudoEnum } from '../../../@core/enum/tipoConteudo.enum';
import { ConteudoModel } from '../../../@core/models/conteudos.model';

@Component({
  selector: 'app-dialog-conteudos-cadastro',
  templateUrl: './dialog-conteudos-cadastro.component.html',
  styleUrls: ['./dialog-conteudos-cadastro.component.scss']
})
export class DialogConteudosCadastroComponent implements OnInit {
  formulario: FormGroup;
  tipoConteudo: TipoConteudoEnum;
  conteudo: ConteudoModel;
  conteudoOld: ConteudoModel;

  constructor(
    private ref: NbDialogRef<DialogConteudosCadastroComponent>,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    console.log(this.tipoConteudo);

    if (this.conteudo == null || this.conteudo == undefined)
      this.conteudo = new ConteudoModel();

    this.createForm(this.conteudo);
  }

  createForm(_conteudo: ConteudoModel) {
    this.conteudo = _conteudo;
    this.conteudoOld = Object.assign({},_conteudo); //Usa caso queira resetar o formulario

    this.formulario = this.fb.group({
      id: [this.conteudo.id, [Validators.required] ],
      titulo: [this.conteudo.titulo,[Validators.required] ],
      ordem: [this.conteudo.ordem ,[Validators.required] ],
      tipo: [this.conteudo.tipo,[Validators.required] ],
      moduloId: [this.conteudo.moduloId,[Validators.required] ]
    });
  }

  fechar() {
    this.ref.close();
  }

}
