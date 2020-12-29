// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// RxJS
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
        return of(false);
        // return this.store
        //     .pipe(
        //         select(isLoggedIn),
        //         tap(loggedIn => {
        //             if (!loggedIn) {
        //                 this.router.navigateByUrl('/auth/login');
        //             }
        //         })
        //     );
    }
}
