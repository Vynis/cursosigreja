import { ModeloBase } from 'src/app/core/_models/modelo-base';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../_models/usurario.model';

@Injectable()
export class UsuarioService {

  caminhoApi: string = '';

  constructor(private http: HttpClient) {
    this.caminhoApi = environment.api;
  }

  cadastrar(usuario: Usuario) : Observable<ModeloBase> {
    return this.http.post<ModeloBase>(`${this.caminhoApi}usuario/cadastrar`,usuario).pipe();
  }

}
