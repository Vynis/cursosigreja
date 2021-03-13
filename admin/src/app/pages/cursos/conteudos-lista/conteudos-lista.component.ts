import { CursosService } from './../../../@core/services/cursos.service';
import { ConteudoService } from '../../../@core/services/conteudo.service';
import { ConteudoModel } from '../../../@core/models/conteudos.model';
import { CursoModel } from '../../../@core/models/curso.model';
import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { DataTableColunas } from '../../components/_models/DataTableColunas';
import { DataTableAcoes } from '../../components/_models/DataTableAcoes';
import { ConteudosCadastroComponent } from '../conteudos-cadastro/conteudos-cadastro.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-conteudos-lista',
  templateUrl: './conteudos-lista.component.html',
  styleUrls: ['./conteudos-lista.component.scss']
})
export class ConteudosComponent implements OnInit {

  curso: CursoModel;

  colunas: DataTableColunas[] = [
    { propriedade: 'id', titulo: 'Id', disabled: false, maxwidth: 100, cell: (row: ConteudoModel) => `${row.id}` },
    { propriedade: 'titulo', titulo: 'Título', disabled: false, cell: (row: ConteudoModel) => `${row.titulo}` },
    { propriedade: 'modulo.titulo', titulo: 'Modulo', disabled: false, cell: (row: ConteudoModel) => `${row.modulo.titulo}` },
    { propriedade: 'ordem', titulo: 'Ordem', disabled: false, cell: (row: ConteudoModel) => `${row.ordem}` }
  ];

  acoes: DataTableAcoes[] = [
    { icone: 'create', evento: this.editar.bind(this), toolTip: 'Editar', color: 'primary' },
    { icone: 'note_add', evento: this.chamarTelaProva.bind(this), toolTip: 'Prova', color: 'primary', visivel: (row: ConteudoModel) => row.tipo == 'PR' || row.tipo == 'PA' ? true : false },
  ];

  dadosTabela: ConteudoModel[] = [];


  constructor(
    private cursosService: CursosService,
    private conteudoService: ConteudoService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {

  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      const id = params.idCurso;
      if (id && id > 0) {
        this.carregaCursoService(id);
      }
      else {
        this.route.navigate(['pages/cursos']);
      }
    });

  }

  carregaCursoService(id: number) {
    this.cursosService.obterPorId(id).subscribe(res => {
      this.curso = res.dados;
      this.carregaConteudoService();
    })
  }

  carregaConteudoService() {
    this.conteudoService.buscar(this.curso.id).subscribe(
      res => {
        this.dadosTabela = res.dados;
        console.log(this.dadosTabela);
      }
    )
  }

  cancel() {
    this.route.navigate(['pages/cursos']);
  }

  editar(conteudo: ConteudoModel) {
    this.route.navigate([`pages/cursos/conteudos/cadastro/edit/${conteudo.id}/${this.curso.id}`])
  }

  novo(curso: CursoModel) {
    this.route.navigate([`pages/cursos/conteudos/cadastro/add/${curso.id}`])
  }

  chamarTelaProva(conteudo: ConteudoModel) {
    this.route.navigate([`pages/cursos/provas/${conteudo.id}`])
  }

}
