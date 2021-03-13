import { ModeloBase } from './../models/modelo-base';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class ModuloService {

  caminhoApi: string = '';

  constructor(private http: HttpClient) {
    this.caminhoApi = environment.api
  }

  obterTodos() {
    return this.http.get<ModeloBase>(`${this.caminhoApi}/modulo/buscar-modulos`)
  }

  obterTodosPorCurso(idCurso: number) {
    return this.http.get<ModeloBase>(`${this.caminhoApi}/modulo/buscar-modulo-curso/${idCurso}`)
  }

}
