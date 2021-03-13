import { ProvaService } from './../../../@core/services/prova.service';
import { ConteudoModel } from './../../../@core/models/conteudos.model';
import { ConteudoService } from './../../../@core/services/conteudo.service';
import { ProvaModel } from './../../../@core/models/prova.model';
import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipProvaEnum } from '../../../@core/enum/tipoProva.enum';
import { ItemProvaModel } from '../../../@core/models/itemprova.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-provas-cadastro',
  templateUrl: './provas-cadastro.component.html',
  styleUrls: ['./provas-cadastro.component.scss']
})
export class ProvasCadastroComponent implements OnInit {
  tituloPagina: string = 'Cadastro de Provas';
  formulario: FormGroup;
  tipoProva = TipProvaEnum;
  prova: ProvaModel;
  provaOld: ProvaModel;
  conteudo: ConteudoModel;
  conteudoId: number;
  existeErro: boolean = false;

  get itensProvas(): FormArray{
    return <FormArray>this.formulario.get('itensProvas');
  }

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private provaService: ProvaService,
    private route: Router,
    private toast: ToastrService,
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      const id = params.idConteudo;
      if (id && id > 0) {
        const idProva = params.id;
        this.conteudoId = id;

        if (idProva && idProva > 0) {
          this.tituloPagina = `Editar Prova - Nº ${idProva}`;
          this.buscarProvaService(idProva);
        }
        else {
          const newProva = new ProvaModel();
          this.createForm(newProva);
        }

      }
      else {
        this.route.navigate(['pages/cursos']);
      }
    });


  }

  createForm(_prova: ProvaModel) {
    this.prova = _prova;
    this.provaOld = Object.assign({},_prova); //Usa caso queira resetar o formulario

    this.formulario = this.fb.group({
      id: [this.prova.id, [Validators.required] ],
      pergunta: [this.prova.pergunta,[Validators.required] ],
      ordem: [this.prova.ordem ,[Validators.required] ],
      tipoComponente: [this.prova.tipoComponente,[Validators.required] ],
      status: [this.prova.status,[Validators.required] ],
      itensProvas: this.fb.array([this.criarGrupoItensProva()])
    });
  }

  criarGrupoItensProva(itemProva: ItemProvaModel = new ItemProvaModel()) : FormGroup {
    return this.fb.group({
      id: [itemProva.id],
      questao: [itemProva.questao ],
      questaoCorreta: [itemProva.questaoCorreta],
      status: [itemProva.status]
    });
  }

  addQuestao() {
    this.itensProvas.push(this.criarGrupoItensProva());
  }

  remQuestao(id) {
    this.itensProvas.removeAt(id);
  }

  buscarProvaService(id) {
    this.provaService.obterPorId(id).subscribe(
      res => {
        this.prova = res.dados;
        this.createForm(res.dados);
        this.remQuestao(0);
        this.prova.itensProvas.forEach(item => {
          this.itensProvas.push(this.criarGrupoItensProva(item));
        })
      }
    )
  }

  submit() {
    if (this.validacao() === false)
    return;

    let cursoModelPreparado = this.prepararModel();

    if (cursoModelPreparado.id > 0) {
      this.atualizar(cursoModelPreparado);
      return;
    }

    this.adcionar(cursoModelPreparado);

  }

  validacao(): boolean{
    this.existeErro = false;
    const controls = this.formulario.controls;

    if (this.formulario.invalid){
      Object.keys(controls).forEach(controlName => 
        controls[controlName].markAllAsTouched()
      );

      this.existeErro = true;
      return false;
    }
    

    const tipo = controls.tipoComponente.value;

    if (tipo == 'T')
      return true;

    if (controls.itensProvas.value.length == 0) {
      this.existeErro = true;
      return false;
    }


    let contRespostaCorreta = 0;  

    controls.itensProvas.value.forEach(element => {
      if (element.questaoCorreta === 'S')
        contRespostaCorreta++;
    });

    if (tipo == 'M') {
      if (contRespostaCorreta < 2){
        this.existeErro = true;
        return false;
      }
    }

    if (tipo == 'E') {
      if (contRespostaCorreta !== 1){
        this.existeErro = true;
        return false;
      }
    }

    return true;
  }

  prepararModel(): ProvaModel {
    const controls = this.formulario.controls;
    const _prova = new ProvaModel();

    _prova.id = this.prova.id;
    _prova.pergunta = controls.pergunta.value;
    _prova.status = controls.status.value;
    _prova.ordem = controls.ordem.value;
    _prova.conteudoId = this.conteudoId;
    _prova.tipoComponente = controls.tipoComponente.value;
    _prova.itensProvas = controls.tipoComponente.value === 'T' ? null : controls.itensProvas.value;

    return _prova;
  }

  adcionar(_prova: ProvaModel){

    this.provaService.adicionar(_prova).subscribe((result: any) => {
      if (!result){
        this.toast.error('Erro ao realizar o cadastro');
        return;
      }

      this.toast.success('Cadastro realizado com sucesso!');
      this.route.navigateByUrl(`/pages/cursos/provas/${this.conteudoId}`);
    });
  }

  atualizar(_prova: ProvaModel){
    this.provaService.atualizar(_prova).subscribe((result: any) => {
      if (!result){
        this.toast.error('Erro ao realizar atualização');
        return;
      }

      this.toast.success('Atualização realizada com sucesso!');
      this.route.navigateByUrl(`/pages/cursos/provas/${this.conteudoId}`);
    });
  }

  voltar() {
    this.route.navigateByUrl(`/pages/cursos/provas/${this.conteudoId}`);
  }


}
