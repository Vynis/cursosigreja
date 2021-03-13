import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DataTableColunas } from '../_models/DataTableColunas';
import { DataTableAcoes } from '../_models/DataTableAcoes';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent implements OnInit, AfterViewInit  {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('sort1', {static: true}) sort: MatSort;

  @Input() colunas: DataTableColunas[] = [];
  @Input() acoes: DataTableAcoes[] = [];
  @Input() set dadosTabela(itens: any[]) {
    this.dataSource.data = itens;
  }
  @Input("usarIMG")usarIMG:boolean =false;
  @Input() tamanhoPagina: number[] = [5, 10, 20];

  dataSource: any = new MatTableDataSource<any>();
  displayedColumns = [];

  constructor() { }

  ngOnInit() {
    this.colunas.forEach(x => {
      this.displayedColumns.push(x.propriedade)
    })
  
    this.displayedColumns.push('acoesheader');
    this.dataSource.paginator = this.paginator;
    const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}
