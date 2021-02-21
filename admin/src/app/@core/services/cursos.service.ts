import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ModeloBase } from '../models/modelo-base';
import { PaginationfilterModel } from '../models/paginationfilter.model';

@Injectable()
export class CursosService {

  caminhoApi: string = '';

  constructor(private http: HttpClient) {
    this.caminhoApi = environment.api;
  }

  obterTodos() {
    return this.http.get<ModeloBase>(`${this.caminhoApi}/curso/buscar-todos`)
  }


  obterDadosFiltro(filtro : PaginationfilterModel) {
    return this.http.post<ModeloBase>(`${this.caminhoApi}/curso/busca-com-filtro`,filtro).pipe()
  }

}
