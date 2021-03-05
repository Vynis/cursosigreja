import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModeloBase } from '../_models/modelo-base';


@Injectable()
export class ProcessoInscricaoService {
    caminhoApi: string = '';

    constructor(private http: HttpClient) {
        this.caminhoApi = environment.api;
    }

    buscarCursosLiberados() {
        return this.http.get<ModeloBase>(`${this.caminhoApi}processo-inscricao/cursos-inscricoes-abertas`);
    }

    buscarCursosDisponivel() {
        return this.http.get<ModeloBase>(`${this.caminhoApi}processo-inscricao/cursos-inscricoes-disponivel`);
    }

}
