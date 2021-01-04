import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { take } from 'rxjs/internal/operators/take';
import { tap } from 'rxjs/internal/operators/tap';
import { AuthService } from '../auth';
import { ModeloBase } from '../_base/crud/models/modelo-base';

@Injectable({
    providedIn: "root"
  })
export class GenericValidator {
    constructor(private auth: AuthService) {}
    static isValidCpf() {
        return (control: AbstractControl): Validators => {
            return null;
            // const numero = control.value;
            // const { cpf } = require('cpf-cnpj-validator');

            // if (numero.length === 11) {

            //     if (!cpf.isValid(numero)){
            //         return { cpfNotValid: true };
            //     }

            //     return null;

            // }
            // else{
            //     return null;
            // }
        }
    }

    static isValidCnpj(){
        return (control: AbstractControl): Validators => {
            return null;
            // const numero = control.value;
            // const { cnpj } = require('cpf-cnpj-validator'); 
            
            // if (numero.length === 14) {
                
            //     if (!cnpj.isValid(numero)){
            //         return { cnpjNotValid: true };
            //     }

            //     return null;

            // }
            // else {
            //     return null;
            // }
        }
    }

    // static isValidExitenciaBdNomeOuCpf(){
    //     return async (control: AbstractControl): Promise<Validators> => { 
    //         debugger
    //         const controle = control.value;
    //         const responseApi  =  await this.authService.verificaUsuario(controle).toPromise();

    //         if (!responseApi.success)
    //             return { existeBd: true }
        
    //         return null;
    //     } 
    // }

    static isValidExitenciaBdNomeOuCpf(auth: AuthService): AsyncValidatorFn {
        return (control: AbstractControl) : Observable<ValidationErrors | null> => {
            const controle = control.value;
            if (controle == null)
                return null; 

            return auth.verificaUsuario(controle).pipe(
               map(
                   res => {
                     return res.success ? null : { invalidAsync : true };
                   }
               )
            )
        }
    }

    isValidExitenciaBdNomeOuCpf2(emailOuCpf: string = "") : AsyncValidatorFn {
        return (control: AbstractControl) : 
        | Promise<{ [key: string]: any } | null>
        | Observable<{ [key: string]: any } | null> => {
        if (isEmptyInputValue(control.value)) {
          return of(null);
        } else if (control.value === emailOuCpf) {
          return of(null);
        } else {
          return  this.auth
            .verificaUsuario(control.value)
            .pipe(
                map(res =>
                res.success ? null : { invalidAsync: true }
                )
            )
        }
      };
    }
}

function isEmptyInputValue(value: any): boolean {
    // we don't check for string here so it also works with arrays
    return value === null || value.length === 0;
  }