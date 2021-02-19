// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {

	constructor(private router: Router) { }
	// intercept request and add token
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
        if (localStorage.getItem('auth_app_token') !== null) {
            const token = JSON.parse(localStorage.getItem('auth_app_token'));
            const cloneReq = req.clone({
                headers: req.headers.set( 'Authorization', `Bearer ${token.value}`)
            });
            return next.handle(cloneReq).pipe(
                tap(
                    sucesso => {},
                    error => {
                        this.router.navigateByUrl('/auth/login');
                    }
                )
            )
        }
        else {
            return next.handle(req.clone());
        };
	}
}
