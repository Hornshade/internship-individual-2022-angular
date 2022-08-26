import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
	selector: 'app-security',
	templateUrl: './security.component.html',
	styleUrls: ['./security.component.scss'],
})
export class SecurityComponent implements OnInit {
	showForm: boolean = false;
	passwordForm: FormGroup | any;
	userPassword!: string;

	constructor(private loginService: LoginService) {
		this.passwordForm = new FormGroup({
			newPassword: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
			]),
		});
		if (localStorage.getItem('emailId') !== null) {
			this.loginService
				.getUserById(localStorage.getItem('emailId'))
				.subscribe((response) => {
					this.userPassword = response.password;
				});
		}
	}

	ngOnInit(): void {}

	changePassword() {
		if (this.passwordForm.valid) {
			this.loginService
				.updatePassword(
					localStorage.getItem('userId'),
					this.passwordForm.get('newPassword')?.value
				)
				.subscribe();
		}
	}

	deactivate() {
		this.loginService
			.deactivateUser(localStorage.getItem('userId'), false)
			.subscribe(() => {
				localStorage.clear();
				location.reload;
			});
	}
}
