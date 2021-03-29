import { AbstractControl } from '@angular/forms';

export class ConfirmPasswordValidator {
	/**
	 * Check matching password with confirm password
	 * @param control AbstractControl
	 */
	static MatchPassword(control: AbstractControl) {
		const password = control.get('senha').value;

		const confirmPassword = control.get('confirmarSenha').value;

		if (password !== confirmPassword) {
			control.get('confirmarSenha').setErrors({ConfirmPassword: true});
		} else {
			return null;
		}
	}
}
