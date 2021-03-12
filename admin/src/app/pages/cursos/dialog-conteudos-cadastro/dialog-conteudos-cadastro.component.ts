import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-dialog-conteudos-cadastro',
  templateUrl: './dialog-conteudos-cadastro.component.html',
  styleUrls: ['./dialog-conteudos-cadastro.component.scss']
})
export class DialogConteudosCadastroComponent implements OnInit {

  constructor(private ref: NbDialogRef<DialogConteudosCadastroComponent>) { }

  ngOnInit() {
  }

  fechar() {
    this.ref.close();
  }

}
