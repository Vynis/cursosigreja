import { MenuModel } from './../../core/_models/menu.model';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.page.html',
  styleUrls: ['./curso.page.scss'],
})
export class CursoPage implements OnInit {
  public nomeCurso = 'Autoridade Espiritual';
  public menu: MenuModel[] = [];

  constructor( ) { }

  ngOnInit() {
    this.menu.push(
      { titulo: '1ª Semanas',url:'', icon: '', open: false, conteudoConcluido: false, children: [{titulo: 'Aula 1',url:'', icon: '', open: false, conteudoConcluido: true, children: []},{titulo: 'Aula 2',url:'', icon: '', open: false, conteudoConcluido: false, children: []}]}
    );
  }

}
