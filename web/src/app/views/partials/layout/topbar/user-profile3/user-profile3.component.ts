// Angular
import { Component, Input, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
import { Usuario } from '../../../../../core/auth/_models/usurario.model';

@Component({
	selector: 'kt-user-profile3',
	templateUrl: './user-profile3.component.html',
})
export class UserProfile3Component implements OnInit {
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
	constructor() {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		//this.user$ = this.store.pipe(select(currentUser));
	}

	/**
	 * Log out
	 */
	logout() {
	//	this.store.dispatch(new Logout());
	}
}
