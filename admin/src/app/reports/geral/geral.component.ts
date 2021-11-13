import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { SettingsTableModel } from '../../@core/models/configuracao/table/settings.table.model';
import { FiltroItemModel } from '../../@core/models/filtroItem.model';
import { PaginationfilterModel } from '../../@core/models/paginationfilter.model';
import { ProcessoInscricaoService } from '../../@core/services/processo-inscricao.service';
import { RelatorioService } from '../../@core/services/relatorio.service';

@Component({
  selector: 'ngx-geral',
  templateUrl: './geral.component.html',
  styleUrls: ['./geral.component.scss']
})
export class GeralComponent implements OnInit {

  
  columns = {
    nome: {
      title: 'Congregacao',
      type: 'string',
    },
    qtd: {
      title: 'Quantidade',
      type: 'number',
    },
    ciclo: {
      title: 'Ciclo',
      type: 'string',
    },
    ano: {
      title: 'Ano',
      type: 'string',
    }
  }

  settings: SettingsTableModel = new SettingsTableModel();
  source: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();
  listaCiclos: any[];
  formulario: FormGroup;
  carregouDados: boolean = false;

  constructor(private processoInscricaoService: ProcessoInscricaoService, private relatorioService: RelatorioService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.settings.columns = this.columns;
    this.settings.actions.custom = [];

    this.buscaListaCiclos();
  
  }

  createForm(filtro) {
    this.formulario = this.fb.group({
      filtroCiclo: [filtro],
    })
  }

  buscaListaCiclos() {
    this.processoInscricaoService.buscarCiclos().subscribe(
      res => {
        if (!res.success)
          return;

        this.listaCiclos = res.dados;
        this.carregouDados = true;
        this.createForm(this.listaCiclos[0]);
        this.pesquisar();
      }
    )
  }

  prepararFiltro() : FiltroItemModel[] {
    let listaFiltro: FiltroItemModel[] = [];
    const control = this.formulario.controls;

    if (control.filtroCiclo.value !== null) { 
      var item  = new FiltroItemModel();
      item.property = 'ciclo';
      item.filterType = 'equals';
      item.value = control.filtroCiclo.value.ciclo;
      listaFiltro.push(item);

      var item2  = new FiltroItemModel();
      item2.property = 'ano';
      item2.filterType = 'equals';
      item2.value = control.filtroCiclo.value.ano;
      listaFiltro.push(item2);
    }


    return listaFiltro;
  }

  buscarDadosContagemPorCongregacao(filtro: PaginationfilterModel) {
    this.relatorioService.buscarContagemInscritosCongregacao(filtro).subscribe(
      res => {
        this.source.load(res.dados);
      }
    )
  }

  buscarDadosContagemPorCurso(filtro: PaginationfilterModel) {
    this.relatorioService.buscarContagemInscritosCurso(filtro).subscribe(
      res => {
        this.source2.load(res.dados);
      }
    )
  }

  pesquisar() {
    const parametros = new PaginationfilterModel();
    parametros.filtro = this.prepararFiltro();
    this.buscarDadosContagemPorCongregacao(parametros);
    this.buscarDadosContagemPorCurso(parametros);
  }

 

}
