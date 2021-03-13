import { ConteudoService } from './../../../@core/services/conteudo.service';
import { TipoConteudoEnum } from './../../../@core/enum/tipoConteudo.enum';
import { ModuloService } from './../../../@core/services/modulo.service';
import { CursoModel } from './../../../@core/models/curso.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { ConteudoModel } from '../../../@core/models/conteudos.model';
import { ModuloModel } from '../../../@core/models/modulos.model';
import { ToastrService } from 'ngx-toastr';
import { ItemProvaModel } from '../../../@core/models/itemprova.model';

@Component({
  selector: 'app-conteudos-cadastro',
  templateUrl: './conteudos-cadastro.component.html',
  styleUrls: ['./conteudos-cadastro.component.scss']
})
export class ConteudosCadastroComponent implements OnInit {
  tituloPagina: string = 'Cadastro de Conteúdo';
  formulario: FormGroup;
  tipoConteudo = TipoConteudoEnum;
  conteudo: ConteudoModel;
  conteudoOld: ConteudoModel;
  cursoId: number;
  listaModulos: ModuloModel[];
  existeErro: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route : Router,
    private activatedRoute: ActivatedRoute,
    private moduloService: ModuloService,
    private conteudoService: ConteudoService,
    private toast: ToastrService,
    ) { 

    }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      const id = params.idCurso;
      if (id && id > 0) {
        const idConteudo = params.id;
        this.cursoId = id;

        if (idConteudo && idConteudo > 0) {
          this.tituloPagina = `Editar Conteúdo - Nº ${idConteudo}`;
          this.buscaPorId(idConteudo);
        }
        else {
          const newConteudo = new ConteudoModel();
          this.createForm(newConteudo);
        }

      }
      else {
        this.route.navigate(['pages/cursos']);
      }
    });


    
  }

  createForm(_conteudo: ConteudoModel) {
    this.buscarModuloService();
    this.conteudo = _conteudo;
    this.conteudoOld = Object.assign({},_conteudo); //Usa caso queira resetar o formulario

    this.formulario = this.fb.group({
      id: [this.conteudo.id, [Validators.required] ],
      titulo: [this.conteudo.titulo,[Validators.required] ],
      ordem: [this.conteudo.ordem ,[Validators.required] ],
      tipo: [this.conteudo.tipo,[Validators.required] ],
      moduloId: [this.conteudo.moduloId,[Validators.required] ],
      arquivo: [this.conteudo.arquivo],   
    });
  }

  fechar() {
    this.route.navigate([`/pages/cursos/conteudos/${this.cursoId}`]);
  }

  buscarModuloService() {
    this.moduloService.obterTodosPorCurso(this.cursoId).subscribe(
      res => {
        if (res.success) {
          this.listaModulos = res.dados;
        }
      }
    )
  }

  carregaTipoConteudo() {
    this.formulario.controls.arquivo.setValue('');
  }

  submit() {
    if (this.validacao() === false)
      return;

    let conteudoModelPreparado = this.prepararModel();

    if (conteudoModelPreparado.id > 0) {
      this.atualizar(conteudoModelPreparado);
      return; 
    }

    this.adcionar(conteudoModelPreparado);

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

    if (controls.tipo.value === 'VE') {
      if (controls.arquivo.value === '' || controls.arquivo.value === null || controls.arquivo.value === undefined) {
        this.existeErro = true;
        return false;
      }
    }

    return true;
  }

  prepararModel(): ConteudoModel {
    const controls = this.formulario.controls;
    const _conteudo = new ConteudoModel();

    _conteudo.id = this.conteudo.id;
    _conteudo.titulo = controls.titulo.value;
    _conteudo.ordem = controls.ordem.value;
    _conteudo.tipo = controls.tipo.value;
    _conteudo.moduloId = controls.moduloId.value;
    _conteudo.arquivo = controls.arquivo.value;
    
    return _conteudo;
  }

  adcionar(_conteudo: ConteudoModel){

    this.conteudoService.adicionar(_conteudo).subscribe((result: any) => {
      if (!result){
        this.toast.error('Erro ao realizar o cadastro');
        return;
      }

      this.toast.success('Cadastro realizado com sucesso!');
      this.route.navigate([`/pages/cursos/conteudos/${this.cursoId}`]);
    });
  }

  atualizar(_conteudo: ConteudoModel){
    this.conteudoService.atualizar(_conteudo).subscribe((result: any) => {
      if (!result){
        this.toast.error('Erro ao realizar atualização');
        return;
      }

      this.toast.success('Atualização realizada com sucesso!');
      this.route.navigate([`/pages/cursos/conteudos/${this.cursoId}`]);
    });
  }

  buscaPorId(id: number) {
    this.conteudoService.obterPorId(id).subscribe(
      res => {
        if(!res.success)
          this.toast.error('Erro a buscar dados!');
        
        this.createForm(res.dados);
      }
    )
  }


}
