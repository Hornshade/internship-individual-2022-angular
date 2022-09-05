import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { User } from 'src/app/interfaces/user';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup | any;
	hide: boolean = true;

	firebaseUser!: Observable<User[]>;
	constructor(
		private router: Router,
		private loginService: LoginService,
		firestore: Firestore
	) {
		const collectionFire = collection(firestore, 'users');
		this.firebaseUser = collectionData(collectionFire, {
			idField: 'id',
		}) as Observable<User[]>;

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
		if (this.loginForm.valid) {
			this.loginService
				.authenticateUser(
					this.loginForm.get('email')?.value,
					this.loginForm.get('password')?.value
				)
				.subscribe(
					(data) => {
						this.loginService.changeUser(data);
						localStorage.setItem('userId', data.id);
					},
					(error) => console.log(error),
					() => this.router.navigate([''])
				);
		} else {
			console.error('Failed to authenticate');
		}
	}
	googleSubmit() {
		this.firebaseUser.forEach((usr) => {
			usr.map((item) => {
				localStorage.setItem('userId', item.id);
			});
		});
		console.log('google');
	}
}
