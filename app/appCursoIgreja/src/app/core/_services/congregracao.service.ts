import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModeloBase } from '../_models/modelo-base';



@Injectable()
export class CongregacaoService {
    caminhoApi: string = '';

    constructor(private http: HttpClient) {
        this.caminhoApi = environment.api;
    }

    buscarTodasCongregacoes(): Observable<ModeloBase> {
        return this.http.get<ModeloBase>(`${this.caminhoApi}congregacao/buscar-todos-ativos`);
    }

}
