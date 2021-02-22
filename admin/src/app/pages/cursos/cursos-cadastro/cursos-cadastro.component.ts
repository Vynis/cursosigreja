import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CursoModel } from '../../../@core/models/curso.model';
import { CursosService } from '../../../@core/services/cursos.service';

@Component({
  selector: 'app-cursos-cadastro',
  templateUrl: './cursos-cadastro.component.html',
  styleUrls: ['./cursos-cadastro.component.scss']
})
export class CursosCadastroComponent implements OnInit {
  tituloPagina: string = 'Cadastro de Cursos';
  formulario: FormGroup;
  curso: CursoModel;
  cursoOld: CursoModel;
  existeErro: boolean = false;

  get modulo(): FormArray{
    return <FormArray>this.formulario.get('modulo');
  }

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private cursoService: CursosService,
    private toast: ToastrService,
    private router: Router
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id && id > 0) {
        this.tituloPagina = `Editar Curso - Nº ${id}`;
        this.buscaPorId(id);
      }
      else {
        const novoCurso = new CursoModel();
        this.createForm(novoCurso);
      }
    });
  }

  createForm(_curso: CursoModel) {
    this.curso = _curso;
    this.cursoOld = Object.assign({},_curso); //Usa caso queira resetar o formulario

    this.formulario = this.fb.group({
      titulo: [this.curso.titulo,[Validators.required] ],
      cargaHoraria: [this.curso.cargaHoraria,[Validators.required] ],
      status: [this.curso.status,[Validators.required] ],
      descricao: [this.curso.descricao,[Validators.required] ],
      modulo: this.fb.array([this.criarGrupoModulo()])
    });
  }

  criarGrupoModulo(): FormGroup {
    return this.fb.group({
      titulo: ['',[Validators.required] ],
      ordem: ['', [Validators.required]],
      cursoId: ['']
    });
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

    return true;
  }

  prepararModel(): CursoModel {
    const controls = this.formulario.controls;
    const _curso = new CursoModel();

    _curso.id = this.curso.id;
    _curso.titulo = controls.titulo.value;
    _curso.status = controls.status.value;
    _curso.descricao = controls.descricao.value;
    _curso.cargaHoraria = controls.cargaHoraria.value;

    return _curso;
  }

  adcionar(_curso: CursoModel){

    this.cursoService.adicionar(_curso).subscribe((result: any) => {
      if (!result){
        this.toast.error('Erro ao realizar o cadastro');
        return;
      }

      this.toast.success('Cadastro realizado com sucesso!');
      this.router.navigateByUrl('/pages/cursos/lista');
    });
  }

  atualizar(_curso: CursoModel){
    this.cursoService.atualizar(_curso).subscribe((result: any) => {
      if (!result){
        this.toast.error('Erro ao realizar atualização');
        return;
      }

      this.toast.success('Atualização realizada com sucesso!');
      this.router.navigateByUrl('/pages/cursos/lista');
    });
  }

  salvar() {
    if (this.validacao() === false)
      return;

    let cursoModelPreparado = this.prepararModel();

    if (cursoModelPreparado.id > 0) {
      this.atualizar(cursoModelPreparado);
      return;
    }

    this.adcionar(cursoModelPreparado);
  }

  buscaPorId(id: number) {
    this.cursoService.obterPorId(id).subscribe(
      res => {
        if(!res.success)
          this.toast.error('Erro a buscar dados!');
        
        this.curso = Object.assign({}, res.dados);
        console.log(this.curso);

        this.formulario.patchValue(this.curso);

        
        //this.createForm(res.dados);
      }
    )
  }

  addModulo() {
    this.modulo.push(this.criarGrupoModulo());
  }

  remModulo(id: number) {
    this.modulo.removeAt(id);
  }

}
