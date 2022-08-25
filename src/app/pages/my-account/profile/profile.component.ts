import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { LoginService } from 'src/app/services/login/login.service';
import * as moment from 'moment';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	// toggle variables
	showName: boolean = false;
	showGender: boolean = false;
	showBirth: boolean = false;
	showEmail: boolean = false;
	showPhone: boolean = false;
	showAddress: boolean = false;

	// user variables
	user!: User;
	fullNameForm: FormGroup | any;
	birthDateForm: FormGroup | any;
	emailForm: FormGroup | any;
	phoneForm: FormGroup | any;
	addressForm: FormGroup | any;
	selectedGender!: string;
	photo!: string;
	constructor(private loginService: LoginService) {
		this.fullNameForm = new FormGroup({
			firstName: new FormControl('', [
				Validators.required,
				Validators.minLength(2),
				Validators.pattern('^[a-zA-Z]{2,20}$'),
			]),
			lastName: new FormControl('', [
				Validators.required,
				Validators.minLength(2),
				Validators.pattern('^[a-zA-Z]{2,20}$'),
			]),
		});
		this.emailForm = new FormGroup({
			email: new FormControl('', [
				Validators.required,
				Validators.email,
				Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
			]),
		});
		this.birthDateForm = new FormGroup({
			birthDate: new FormControl(moment('', 'MM/DD/YYYY')),
		});
		this.phoneForm = new FormGroup({
			phone: new FormControl('', [Validators.pattern('^[0-9]*$')]),
		});
		this.addressForm = new FormGroup({
			address: new FormControl(''),
		});

		console.log(localStorage.getItem('userId'));
		this.loginService
			.getUserById(localStorage.getItem('userId'))
			.subscribe((data) => {
				let split = data.fullName.split(' ');
				this.fullNameForm.setValue({
					firstName: split[0] || '',
					lastName: split[1] || '',
				});
				this.emailForm.setValue({ email: data.email });
				this.birthDateForm.setValue({ birthDate: data.dateOfBirth });
				this.phoneForm.setValue({ phone: data.phone });
				this.addressForm.setValue({ address: data.address });
				if (data.gender === 0) this.selectedGender = '';
				else if (data.gender === 1) this.selectedGender = 'male';
				else if (data.gender === 2) this.selectedGender = 'female';
				this.photo = data.photo;
				console.log(data);
			});
	}

	ngOnInit(): void {}

	onSubmit() {
		let fullName =
			this.fullNameForm.get('firstName')?.value +
				' ' +
				this.fullNameForm.get('lastName')?.value || '';
		this.loginService
			.updateUser(
				localStorage.getItem('userId'),
				fullName,
				this.emailForm.get('email')?.value,
				this.selectedGender,
				this.phoneForm.get('phone')?.value,
				this.birthDateForm.get('birthDate')?.value,
				this.addressForm.get('address')?.value,
				this.photo,
				true
			)
			.subscribe();
	}
}
