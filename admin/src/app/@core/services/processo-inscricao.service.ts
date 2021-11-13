import { ProvaModel } from '../models/prova.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ModeloBase } from '../models/modelo-base';

@Injectable()
export class ProcessoInscricaoService {

  caminhoApi: string = '';

  constructor(private http: HttpClient) {
    this.caminhoApi = environment.api
  }

  buscarCiclos() {
    return this.http.get<ModeloBase>(`${this.caminhoApi}/processo-inscricao/buscar-ciclos`)
  }



}
