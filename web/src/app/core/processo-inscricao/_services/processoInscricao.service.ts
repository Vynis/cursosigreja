import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ModeloBase } from '../../_base/crud/models/modelo-base';


@Injectable()
export class ProcessoInscricaoService {
    caminhoApi: string = '';

    constructor(private http: HttpClient) {
        this.caminhoApi = environment.api;
    }

    buscarCursosLiberados(): Observable<ModeloBase> {
        return this.http.get<ModeloBase>(`${this.caminhoApi}processo-inscricao/cursos-inscricoes-abertas`);
    }

    buscarCursosDisponivel(): Observable<ModeloBase> {
        return this.http.get<ModeloBase>(`${this.caminhoApi}processo-inscricao/cursos-inscricoes-disponivel`);
    }

}
