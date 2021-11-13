import { ProvaModel } from '../models/prova.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ModeloBase } from '../models/modelo-base';
import { PaginationfilterModel } from '../models/paginationfilter.model';

@Injectable()
export class RelatorioService {

  caminhoApi: string = '';

  constructor(private http: HttpClient) {
    this.caminhoApi = environment.api
  }

  buscarContagemInscritosCongregacao(filtro: PaginationfilterModel) {
    return this.http.post<ModeloBase>(`${this.caminhoApi}/relatorio/busca-contagem-inscricao-congregacao`, filtro)
  }

  buscarContagemInscritosCurso(filtro: PaginationfilterModel) {
    return this.http.post<ModeloBase>(`${this.caminhoApi}/relatorio/busca-contagem-inscricao-curso`, filtro)
  }


}
