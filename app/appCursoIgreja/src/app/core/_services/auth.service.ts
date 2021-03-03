import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user.model';
import { Permission } from '../_models/permission.model';
import { Role } from '../_models/role.model';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../_models/usurario.model';
import { environment } from 'src/environments/environment';
import { ModeloBase } from '../_models/modelo-base';

const API_USERS_URL = 'api/users';
const API_PERMISSION_URL = 'api/permissions';
const API_ROLES_URL = 'api/roles';

@Injectable()
export class AuthService {
    caminhoApi: string = '';

    constructor(private http: HttpClient) {
         this.caminhoApi = environment.api;
    }
    // Authentication/Authorization
    login(email: string, password: string): Observable<any> {
        return this.http.post<Usuario>(this.caminhoApi + "auth", { email, senha: password }).pipe(
            tap((res: Usuario) => {
                return res;
            })
        );
    }

    check(): boolean{
        return localStorage.getItem('usuario') ? true : false;
    }

    register(user: User): Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.post<User>(API_USERS_URL, user, { headers: httpHeaders })
            .pipe(
                map((res: User) => {
                    return res;
                }),
                catchError(err => {
                    return null;
                })
            );
    }

    getUser(): Usuario {
        return localStorage.getItem('usuario') ? JSON.parse(atob(localStorage.getItem('usuario'))) : new User();
    }

    logout(): void {
        localStorage.clear(); 
    }

    verificaUsuario(emailOuCpf: string) : Observable<ModeloBase | undefined> {
        return this.http.get<ModeloBase>(`${this.caminhoApi}usuario/verifica-cadastro/${emailOuCpf}`).pipe();
    }

    validaRecuperacaoSenha(codigo: string) : Observable<ModeloBase | undefined> {
        return this.http.get<ModeloBase>(`${this.caminhoApi}auth/valida-recuperacao-senha/${codigo}`).pipe();
    }

    alterarSenha(codigo: string, senhaNova: string) : Observable<ModeloBase | undefined> {
        return this.http.post<ModeloBase>(`${this.caminhoApi}auth/resetar-senha?codigo=${codigo}&novaSenha=${senhaNova}`, {codigo, senhaNova } ).pipe();
    }

    /*
     * Submit forgot password request
     *
     * @param {string} email
     * @returns {Observable<any>}
     */
    public requestPassword(email: string): Observable<any> {
    	return this.http.post(this.caminhoApi + 'auth/recuperar-senha/'+ email , { emailOuCpf: email })
    		.pipe(catchError(this.handleError('forgot-password', []))
	    );
    }

 	/*
 	 * Handle Http operation that failed.
 	 * Let the app continue.
     *
	 * @param operation - name of the operation that failed
 	 * @param result - optional value to return as the observable result
 	 */
    private handleError<T>(operation = 'operation', result?: any) {
        return (error: any): Observable<any> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result);
        };
    }
}
