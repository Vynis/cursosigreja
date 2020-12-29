import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { CepModel } from './cep.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  consultaCep(cep: string) : Observable<CepModel>  {
    //Nova valiravel cep somente com digitos
    cep = cep.replace(/\D/g,'');
    //Verifica se campo cep possui valor informado
    if (cep !== ''){
      //Espresso regular para validar CEP
      const validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)){
        return this.http.get<CepModel>(`//viacep.com.br/ws/${cep}/json`);
      }
    }

    return null;
  }

}
