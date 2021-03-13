import { ProvaModel } from './../models/prova.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ModeloBase } from '../models/modelo-base';

@Injectable()
export class ProvaService {

  caminhoApi: string = '';

  constructor(private http: HttpClient) {
    this.caminhoApi = environment.api
  }

  buscar(idConteudo: number) {
    return this.http.get<ModeloBase>(`${this.caminhoApi}/prova/buscar-prova/${idConteudo}`)
  }

  obterPorId(id: number) {
    return this.http.get<ModeloBase>(`${this.caminhoApi}/prova/buscar-id/${id}`)
  }

  adicionar(prova: ProvaModel) {
    return this.http.post<ModeloBase>(`${this.caminhoApi}/prova/adcionar`,prova).pipe()
  }

  atualizar(prova: ProvaModel) {
    return this.http.put<ModeloBase>(`${this.caminhoApi}/prova/alterar`,prova).pipe()
  }

  deletar(id: number){
    return this.http.delete<ModeloBase>(`${this.caminhoApi}/prova/deletar/${id}`)
  }

}
