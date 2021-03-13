import { ProvaService } from './../../../@core/services/prova.service';
import { ConteudoModel } from './../../../@core/models/conteudos.model';
import { ProvaModel } from './../../../@core/models/prova.model';
import { Component, OnInit } from '@angular/core';
import { DataTableColunas } from '../../components/_models/DataTableColunas';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoModel } from '../../../@core/models/curso.model';
import { FiltroItemModel } from '../../../@core/models/filtroItem.model';
import { PaginationfilterModel } from '../../../@core/models/paginationfilter.model';
import { CursosService } from '../../../@core/services/cursos.service';
import { DataTableAcoes } from '../../components/_models/DataTableAcoes';
import { ConteudoService } from '../../../@core/services/conteudo.service';
import { TipProvaEnum } from '../../../@core/enum/tipoProva.enum';

@Component({
  selector: 'ngx-provas-lista',
  templateUrl: './provas-lista.component.html',
  styleUrls: ['./provas-lista.component.scss']
})
export class ProvasListaComponent implements OnInit {

  colunas: DataTableColunas[] = [
    { propriedade: 'id', titulo: 'Id', disabled: false, maxwidth: 100 , cell: (row:  ProvaModel) => `${row.id}` },
    { propriedade: 'pergunta', titulo: 'Título', disabled: false, cell: (row:  ProvaModel) => `${row.pergunta}` },
    { propriedade: 'tipoComponente', titulo: 'Tipo de Componente', disabled: false,  cell: (row:  ProvaModel) => this.descricaoTipoProva(row.tipoComponente) },
    { propriedade: 'ordem', titulo: 'Ordem', disabled: false, maxwidth: 50, cell: (row:  ProvaModel) => `${row.ordem}` },
    { propriedade: 'status', titulo: 'Status', disabled: false, maxwidth: 50, cell: (row:  ProvaModel) => row.status == 'A' ? 'Ativo' : 'Inativo' },
  ];

  acoes: DataTableAcoes[] = [
    { icone: 'create', evento: this.editar.bind(this), toolTip: 'Editar', color: 'primary' },
  ];

  dadosTabela: CursoModel[] = [];
  conteudo: ConteudoModel;
  tipoProva = TipProvaEnum;

  constructor(
    private conteudoService: ConteudoService,
    private provaService: ProvaService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params.idConteudo;
      if (id && id > 0) {
        this.carregaConteudoService(id);
      }
      else {
        this.route.navigate(['pages/cursos']);
      }
    });
  }

  carregaConteudoService(id: number) {
    this.conteudoService.obterPorId(id).subscribe(res => {
      this.conteudo = res.dados;
      this.carregaProvaService();
    })
  }

  carregaProvaService() {
    this.provaService.buscar(this.conteudo.id).subscribe(
      res => {
        this.dadosTabela = res.dados;
      }
    )
  }

  cancel() {
    this.route.navigate([`pages/cursos/conteudos/${this.conteudo.modulo.cursoId}`]);
  }

  editar(prova: ProvaModel) {
    this.route.navigate([`pages/cursos/provas/cadastro/edit/${prova.id}/${this.conteudo.id}`])
  }

  novo(conteudo: ConteudoModel) {
    this.route.navigate([`pages/cursos/provas/cadastro/add/${conteudo.id}`])
  }

  descricaoTipoProva(tipo) {
    return this.tipoProva.filter(x =>  x.id === tipo)[0].descricao;
  }

}
