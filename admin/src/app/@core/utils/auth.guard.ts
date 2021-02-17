// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
// RxJS
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: NbAuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.isAuthenticated()
        .pipe(
            tap(authenticated => {
                if (!authenticated)
                    this.router.navigateByUrl('/auth/login');
            })
        )

    }
}
