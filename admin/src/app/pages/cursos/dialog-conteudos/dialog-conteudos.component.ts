import { ConteudoService } from './../../../@core/services/conteudo.service';
import { ConteudoModel } from './../../../@core/models/conteudos.model';
import { CursoModel } from './../../../@core/models/curso.model';
import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { DataTableColunas } from '../../components/_models/DataTableColunas';
import { DataTableAcoes } from '../../components/_models/DataTableAcoes';
import { DialogConteudosCadastroComponent } from '../dialog-conteudos-cadastro/dialog-conteudos-cadastro.component';

@Component({
  selector: 'app-dialog-conteudos',
  templateUrl: './dialog-conteudos.component.html',
  styleUrls: ['./dialog-conteudos.component.scss']
})
export class DialogConteudosComponent implements OnInit {

  curso: CursoModel;

  colunas: DataTableColunas[] = [
    { propriedade: 'id', titulo: 'Id', disabled: false, maxwidth: 100 , cell: (row:  ConteudoModel) => `${row.id}` },
    { propriedade: 'titulo', titulo: 'Título', disabled: false, cell: (row:  ConteudoModel) => `${row.titulo}` },
    { propriedade: 'modulo.titulo', titulo: 'Modulo', disabled: false, cell: (row:  ConteudoModel) => `${row.modulo.titulo}` },
    { propriedade: 'ordem', titulo: 'Ordem', disabled: false, cell: (row:  ConteudoModel) => `${row.ordem}` }
  ];

  acoes: DataTableAcoes[] = [
    { icone: 'create', evento: this.editar.bind(this), toolTip: 'Editar', color: 'primary' },
  ];

  dadosTabela: ConteudoModel[] = [];


  constructor(private ref: NbDialogRef<DialogConteudosComponent>,
    private conteudoService: ConteudoService,
    private dialogService: NbDialogService
    ) { }

  ngOnInit() {
    this.conteudoService.buscar(this.curso.id).subscribe( 
      res => {
        this.dadosTabela = res.dados;
        console.log(this.dadosTabela);
      }
    )
  }

  cancel() {
    this.ref.close();
  }

  editar() {
    this.dialogService.open(DialogConteudosCadastroComponent, { } );
  }

  novo() {
    this.dialogService.open(DialogConteudosCadastroComponent, { } );
  }



}
