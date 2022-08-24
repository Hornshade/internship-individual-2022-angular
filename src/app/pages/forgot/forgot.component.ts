import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
	selector: 'app-forgot',
	templateUrl: './forgot.component.html',
	styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
	forgotForm: FormGroup | any;

	constructor(private router: Router, private loginservice: LoginService) {
		this.forgotForm = new FormGroup({
			email: new FormControl('', [
				Validators.required,
				Validators.email,
				Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
			]),
		});
	}

	ngOnInit(): void {}

	onSubmit() {
		if (this.forgotForm.valid) {
			this.loginservice
				.searchUserByEmail(this.forgotForm.get('email')?.value)
				.subscribe();
			this.loginservice
				.forgotPassword(this.forgotForm.get('email')?.value)
				.subscribe();
			this.router.navigate(['/reset']);
		}
	}
}
