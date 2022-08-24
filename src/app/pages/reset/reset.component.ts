import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
	selector: 'app-reset',
	templateUrl: './reset.component.html',
	styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit, AfterViewInit {
	userId!: string | null;
	resetForm: FormGroup | any;
	userPassword!: string;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private loginService: LoginService
	) {
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
	}

	ngOnInit(): void {
		if (localStorage.getItem('emailId') !== null) {
			this.loginService
				.getUserById(localStorage.getItem('emailId'))
				.subscribe((response) => {
					console.log(response, 'local');
					this.userPassword = response.password;
					console.log(this.userPassword, 'var pass');
				});
		}
		console.log(this.userPassword, 'var pass outside if');
	}
	ngAfterViewInit(): void {
		console.log(this.userPassword, 'var pass afterview');
	}

	onSubmit() {
		if (this.resetForm.valid) {
			this.loginService
				.resetPassword(
					this.userId,
					this.resetForm.get('oldPassword')?.value,
					this.resetForm.get('newPassword')?.value
				)
				.subscribe();
			localStorage.removeItem('emailId');
			this.router.navigate([' ']);
		}
	}
}
