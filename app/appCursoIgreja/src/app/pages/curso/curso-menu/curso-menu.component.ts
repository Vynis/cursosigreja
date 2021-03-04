import { Router } from '@angular/router';
import { MenuModel } from './../../../core/_models/menu.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Conteudo } from 'src/app/core/_models/conteudos.model';

@Component({
  selector: 'app-curso-menu',
  templateUrl: './curso-menu.component.html',
  styleUrls: ['./curso-menu.component.scss'],
})
export class CursoMenuComponent implements OnInit {

  @Input() titulo = '';
  @Input() pages: MenuModel[] = [];
  @Output() carregaPagina = new EventEmitter();
  @Input() conteudo: Conteudo;
  @Input() qtdProgresso: number = 0;

  constructor(private router: Router,private navCtrl: NavController) { }

  ngOnInit() {}

  chamarPagina(event){
    this.carregaPagina.emit(event)
  }

}
