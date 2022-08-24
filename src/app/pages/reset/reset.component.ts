import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
	selector: 'app-reset',
	templateUrl: './reset.component.html',
	styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
	userId!: string;
	resetForm: FormGroup | any;
	userPassword!: string;

	constructor(private router: Router, private loginService: LoginService) {
		this.resetForm = new FormGroup({
			oldPassword: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
			]),
			newPassword: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
			]),
		});
		this.loginService.currentEmailId.subscribe((data) => {
			if (data !== null) this.userId = data;
		});
	}

	ngOnInit(): void {
		this.loginService.getUserById(this.userId).subscribe((data) => {
			if (data !== null) this.userPassword = data.password;
		});
	}

	onSubmit() {
		if (this.resetForm.valid) {
			if (this.resetForm.get('oldPassword')?.value === this.userPassword) {
				this.loginService
					.resetPassword(
						this.userId,
						this.resetForm.get('oldPassword')?.value,
						this.resetForm.get('newPassword')?.value
					)
					.subscribe();
				this.router.navigate([' ']);
			} else {
				//aici nu stiu sigur daca asa trebuie ?
				this.resetForm.valid = false;
			}
		}
	}
}
