import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';
import { environment } from '../../../../environments/environment';
import { ModeloBase } from '../../_base/crud/models/modelo-base';
import { InscricaoUsuario } from '../_models/inscricaoUsuario.model';


@Injectable()
export class InscricaoUsuarioService {
    caminhoApi: string = '';

    constructor(private http: HttpClient) {
        this.caminhoApi = environment.api;
    }

    cadastrar(inscricao: InscricaoUsuario, userToken: string): Observable<any> {
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken
        });

        return this.http.post<InscricaoUsuario>(`${this.caminhoApi}inscricao-usuario/cadastrar`,inscricao,{ headers: httpHeaders } )
            .pipe(
                tap((res: InscricaoUsuario) => {
                    return res;
                }),
                catchError(err => {
                    return null;
                })
            );
    }


    cadastrarSemToken(inscricao: InscricaoUsuario): Observable<any> {
        return this.http.post<InscricaoUsuario>(`${this.caminhoApi}inscricao-usuario/cadastrar`,inscricao)
            .pipe(
                tap((res: InscricaoUsuario) => {
                    return res;
                }),
                catchError(err => {
                    return null;
                })
            );
    }

    gerarPagamento(idInscricao: number, userToken: string) : Observable<any> {
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken
        });

        return this.http.post<InscricaoUsuario>(`${this.caminhoApi}inscricao-usuario/gerar/${idInscricao}`, { id: idInscricao } ,{ headers: httpHeaders } )
        .pipe(
            tap((res: InscricaoUsuario) => {
                return res;
            }),
            catchError(err => {
                return null;
            })
        );
    }


    gerarPagamentoSemToken(idInscricao: number) : Observable<ModeloBase> {
        return this.http.post<ModeloBase>(`${this.caminhoApi}inscricao-usuario/gerar/${idInscricao}`, { id: idInscricao } );
    }

    buscaCursoIsncrito() : Observable<ModeloBase> {
        return this.http.get<ModeloBase>(`${this.caminhoApi}inscricao-usuario/busca-curso-inscrito`);
    }

    buscaTransacao(idTransacao: string) : Observable<ModeloBase> {
        return this.http.get<ModeloBase>(`${this.caminhoApi}inscricao-usuario/buscar-transacao/${idTransacao}`);
    }

    cancelarInscricao(idInscricao: number) : Observable<ModeloBase> {
        return this.http.put<ModeloBase>(`${this.caminhoApi}inscricao-usuario/cancelar-incricao/${idInscricao}`,  { id: idInscricao } );
    }
}
