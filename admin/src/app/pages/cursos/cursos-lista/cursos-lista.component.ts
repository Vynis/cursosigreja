import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { CursoModel } from '../../../@core/models/curso.model';
import { FiltroItemModel } from '../../../@core/models/filtroItem.model';
import { PaginationfilterModel } from '../../../@core/models/paginationfilter.model';
import { CursosService } from '../../../@core/services/cursos.service';
import { DataTableAcoes } from '../../components/_models/DataTableAcoes';
import { DataTableColunas } from '../../components/_models/DataTableColunas';
import { ConteudosComponent } from '../conteudos-lista/conteudos-lista.component';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  @ViewChild('filtroTitulo', { static: true }) filtroTitulo: ElementRef;

  colunas: DataTableColunas[] = [
    { propriedade: 'id', titulo: 'Id', disabled: false, maxwidth: 100 , cell: (row:  CursoModel) => `${row.id}` },
    { propriedade: 'titulo', titulo: 'Título', disabled: false, cell: (row:  CursoModel) => `${row.titulo}` },
    { propriedade: 'status', titulo: 'Status', disabled: false, maxwidth: 50 , cell: (row:  CursoModel) => row.status == 'A' ? 'Ativo' : 'Inativo' },
  ];

  acoes: DataTableAcoes[] = [
    { icone: 'create', evento: this.editar.bind(this), toolTip: 'Editar', color: 'primary' },
    { icone: 'assignment', evento: this.abrirConteudo.bind(this), toolTip: 'Contéudo', color: 'primary' },
    { icone: 'lock_open', evento: this.editar.bind(this), toolTip: 'Liberação do Modulo', color: 'primary' },
  ];

  dadosTabela: CursoModel[] = [];

  constructor(
    private cursoServices: CursosService,
    private route: Router,
    ) { }

  ngOnInit() {
    this.obterDadosGrid();
  }

  obterDadosGrid() {
    const parametros = new PaginationfilterModel();
    parametros.filtro = this.prepararFiltro();

    this.cursoServices.obterDadosFiltro(parametros).subscribe(
      res => this.dadosTabela = res.dados
    );

  }

  prepararFiltro() : FiltroItemModel[] {
    let listaFiltro: FiltroItemModel[] = [];

    if (this.filtroTitulo.nativeElement.value !== '')
      listaFiltro.push({ property: 'titulo', filterType: 'contains', value: this.filtroTitulo.nativeElement.value });

    return listaFiltro;
  }

  editar(cursos: CursoModel) {
    this.route.navigate([`pages/cursos/cadastro/edit/${cursos.id}`]);
  }

  abrirConteudo(cursos: CursoModel) {
    this.route.navigate([`pages/cursos/conteudos/${cursos.id}`]);
  }

  //teste

}
