import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';
import { environment } from '../../../../environments/environment';
import { ModeloBase } from '../../_base/crud/models/modelo-base';
import { Usuario } from '../_models/usurario.model';


@Injectable()
export class InscricaoService {
    caminhoApi: string = '';

    constructor(private http: HttpClient) {
        this.caminhoApi = environment.api;
    }

    buscarTodasCongregacoes(): Observable<ModeloBase> {
        return this.http.get<ModeloBase>(`${this.caminhoApi}congregacao/buscar-todos-ativos`);
    }

    cadastrar(usuario: Usuario): Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.post<Usuario>(`${this.caminhoApi}usuario/cadastrar`,usuario,{ headers: httpHeaders } )
        .pipe(
            tap((res: Usuario) => {            
                return res;
            }),
            catchError(err => {
                return null;
            })
        );
    }
}
