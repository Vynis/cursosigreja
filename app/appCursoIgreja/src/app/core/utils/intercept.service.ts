import { SecurityUtil } from 'src/app/core/utils/security.util';

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

@Injectable()
export class InterceptService implements HttpInterceptor {

	constructor(private router: Router) { }
	// intercept request and add token
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
        if (SecurityUtil.getToken() !== null) {
            const cloneReq = req.clone({
                headers: req.headers.set( 'Authorization', `Bearer ${SecurityUtil.getToken()}`)
            });
            return next.handle(cloneReq).pipe(
                tap(
                    sucesso => {},
                    error => {
                        this.router.navigate(['/login']);
                    }
                )
            )
        }
        else {
            return next.handle(req.clone());
        };
	}
}
