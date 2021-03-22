import { SecurityUtil } from 'src/app/core/utils/security.util';

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { NavController } from '@ionic/angular';

@Injectable()
export class InterceptService implements HttpInterceptor {

	constructor(private navCtrl: NavController) { }
	// intercept request and add token
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
        if (SecurityUtil.getToken() !== null && !req.url.includes('viacep.com.br')) {
            const cloneReq = req.clone({
                headers: req.headers.set( 'Authorization', `Bearer ${SecurityUtil.getToken()}`)
            });
            return next.handle(cloneReq).pipe(
                tap(
                    sucesso => {},
                    error => {
                        this.navCtrl.navigateRoot('/login');
                    }
                )
            )
        }
        else {
            return next.handle(req.clone());
        };
	}
}
