import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
	signupForm: FormGroup | any;

	constructor(private loginService: LoginService, private router: Router) {
		this.signupForm = new FormGroup({
			email: new FormControl('', [
				Validators.required,
				Validators.email,
				Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
			]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
			]),
		});
	}

	ngOnInit(): void {}

	onSubmit() {
		if (this.signupForm.valid) {
			this.loginService
				.signupUser(
					this.signupForm.get('email')?.value,
					this.signupForm.get('password')?.value
				)
				.subscribe();
			this.router.navigate(['login']);

			// this.loginService
			// 	.authenticateUser(
			// 		this.signupForm.get('email')?.value,
			// 		this.signupForm.get('password')?.value
			// 	)
			// 	.subscribe((data) => this.loginService.changeUser(data));
			// this.router.navigate([' ']);
		} else console.error('Failed to sign up');
	}
}
