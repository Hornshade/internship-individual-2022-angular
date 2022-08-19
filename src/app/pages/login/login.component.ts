import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup | any;
	title = 'material-login';
	constructor(private router: Router, private loginService: LoginService) {
		this.loginForm = new FormGroup({
			email: new FormControl('', [
				Validators.required,
				Validators.email,
				Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
			]),
			password: new FormControl('', [
				Validators.required,
				Validators.pattern('^.{8,30}$'),
			]),
		});
	}
	ngOnInit(): void {}
	onSubmit() {
		console.log(this.loginForm.get('email')?.value, 'email');
		console.log(this.loginForm.get('password')?.value, 'password');
		if (this.loginForm.valid) {
			this.loginService
				.authenticateUser(
					this.loginForm.get('email')?.value,
					this.loginForm.get('password')?.value
				)
				.subscribe((data) => {
					console.log(data);
				});
			//this.router.navigate(['']);
		} else {
			console.error('Failed to authenticate');
		}
	}
}
