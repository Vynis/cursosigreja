// Angular
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../../../../core/auth';
import { Usuario } from '../../../../../core/auth/_models/usurario.model';


@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
	// Public properties

	@Input() avatar = true;
	@Input() greeting = true;
	@Input() badge: boolean;
	@Input() icon: boolean;

	user$: Usuario;


	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor(public authService: AuthService,private router: Router) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		//this.user$ = this.store.pipe(select(currentUser));
		this.user$ = this.authService.getUser();
	}

	/**
	 * Log out
	 */
	logout() {
//		this.store.dispatch(new Logout());
		this.authService.logout();
		this.router.navigateByUrl('/auth/login');
	}
}
