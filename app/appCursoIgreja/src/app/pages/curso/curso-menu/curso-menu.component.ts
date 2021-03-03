import { MenuModel } from './../../../core/_models/menu.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-curso-menu',
  templateUrl: './curso-menu.component.html',
  styleUrls: ['./curso-menu.component.scss'],
})
export class CursoMenuComponent implements OnInit {

  @Input() titulo = '';
  @Input() pages: MenuModel[] = [];

  constructor() { }

  ngOnInit() {}

  chamarPagina(event){
    console.log(event);
  }

}
