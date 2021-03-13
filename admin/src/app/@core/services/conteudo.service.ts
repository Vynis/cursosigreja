import { ConteudoModel } from './../models/conteudos.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ModeloBase } from '../models/modelo-base';

@Injectable({
  providedIn: 'root',
})
export class ConteudoService {

  caminhoApi: string = '';

  constructor(private http: HttpClient) {
    this.caminhoApi = environment.api;
  }

  buscar(idCurso: number) {
    return this.http.get<ModeloBase>(`${this.caminhoApi}/conteudo/buscar-conteudo/${idCurso}`)
  }

  obterPorId(id: number) {
    return this.http.get<ModeloBase>(`${this.caminhoApi}/conteudo/buscar-id/${id}`)
  }

  adicionar(conteudo: ConteudoModel) {
    return this.http.post<ModeloBase>(`${this.caminhoApi}/conteudo/adcionar`,conteudo).pipe()
  }

  atualizar(conteudo: ConteudoModel) {
    return this.http.put<ModeloBase>(`${this.caminhoApi}/conteudo/alterar`,conteudo).pipe()
  }

  deletar(id: number){
    return this.http.delete<ModeloBase>(`${this.caminhoApi}/conteudo/deletar/${id}`)
  }
}
