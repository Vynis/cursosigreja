import { Component, OnInit } from '@angular/core';
import { CursoModel } from '../../../@core/models/curso.model';
import { CursosService } from '../../../@core/services/cursos.service';
import { DataTableAcoes } from '../../components/_models/DataTableAcoes';
import { DataTableColunas } from '../../components/_models/DataTableColunas';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  colunas: DataTableColunas[] = [
    { propriedade: 'id', titulo: 'Id', disabled: false, maxwidth: 100 , cell: (row:  CursoModel) => `${row.id}` },
    { propriedade: 'titulo', titulo: 'Título', disabled: false, cell: (row:  CursoModel) => `${row.titulo}` },
    { propriedade: 'status', titulo: 'Status', disabled: false, maxwidth: 50 , cell: (row:  CursoModel) => row.status == 'A' ? 'Ativo' : 'Inativo' , cor: (row: CursoModel) => row.status == 'A' ? 'blue' : 'red' },
  ];

  acoes: DataTableAcoes[] = [
    { icone: 'create', evento: this.editar.bind(this), toolTip: 'Editar', color: 'primary' },
  ];

  dadosTabela: CursoModel[] = [];

  constructor(private cursoServices: CursosService) { }

  ngOnInit() {

    this.cursoServices.obterTodos().subscribe(
      res => this.dadosTabela = res.dados
    );
  }

  editar() {

  }

}
