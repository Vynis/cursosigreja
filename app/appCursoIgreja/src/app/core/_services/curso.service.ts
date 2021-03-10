import { ModeloBase } from './../_models/modelo-base';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProvaUsuario } from '../_models/provaUsuario.model';

@Injectable()
export class CursoService {
  caminhoApi: string = '';

  constructor(private http: HttpClient) {
    this.caminhoApi = environment.api;
  }

  carregaCurso(id: number) {
    return this.http.get<ModeloBase>(`${this.caminhoApi}curso/carrega-curso/${id}`);
  }

  carregaConteudoCurso(id: number, idConteudo: number) {
    return this.http.get<ModeloBase>(`${this.caminhoApi}curso/carrega-conteudo-curso/${id}/${idConteudo}`);
  }

  carregaConteudoCursoAcao(id: number, idConteudo: number, acao: string) {
    return this.http.get<ModeloBase>(`${this.caminhoApi}curso/carrega-conteudo-acao/${id}/${idConteudo}/${acao}`);
  }

  carregaModuloCurso(id: number) {
    return this.http.get<ModeloBase>(`${this.caminhoApi}curso/carrega-modulo-curso/${id}`);
  }

  salvarProva(provaUsuario: ProvaUsuario[]) {
    return this.http.post(`${this.caminhoApi}prova-usuario/salvar-prova`, {provaUsuario: provaUsuario});
  }
}
