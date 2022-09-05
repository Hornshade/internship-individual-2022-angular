import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { HttpParams } from '@angular/common/http';

describe('LoginService', () => {
	let service: LoginService;
	let httpController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [LoginService],
		});
		service = TestBed.inject(LoginService);
		httpController = TestBed.inject(HttpTestingController);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should authenticate', () => {
		const testData = true;

		service
			.authenticateUser('user@user.com', 'useruser')
			.subscribe((result) => {
				expect(result).toBeTruthy();
			});
		const req = httpController.expectOne(
			'http://assist-jully-2022-be2.azurewebsites.net/api/user/authenticate'
		);
		expect(req.request.method).toBe('POST');
		req.flush({
			results: [
				{
					user: {
						fullName: 'Test',
						email: 'user@user.com',
						gender: 'male',
						phone: '07123',
						isActive: true,
						photo: 'photo',
					},
				},
			],
		});
	});
	//aici nu a schimbat coverage %
	it('should get user by id', () => {
		service.getUserById('userid').subscribe((result) => {
			expect(result).toBeTruthy();
			expect(result.id).toEqual('userid');
		});

		const req = httpController.expectOne(service.ROOT_URL + '/api/user/userid');

		expect(req.request.method).toBe('GET');

		req.flush({
			id: 'userid',
			fullName: 'Test',
			email: 'user@user.com',
			gender: 'male',
			phone: '07123',
			isActive: true,
			photo: 'photo',
		});
	});

	it('should sign up user', () => {
		let params = new HttpParams();
		params = params.append('email', 'email');
		params = params.append('password', 'password');
		service.signupUser('email', 'password').subscribe((result) => {
			expect(result).toBeTruthy();
		});

		const req = httpController.match(
			service.ROOT_URL + 'api/user/register?' + params
		);
		httpController.expectNone(service.ROOT_URL + 'api/user/register?' + params);
	});

	it('should send an email', () => {
		let params = new HttpParams();
		params = params.append('email', 'email');
		service.forgotPassword('email').subscribe((result) => {
			expect(result).toBeTruthy();
		});
		const req = httpController.match(
			service.ROOT_URL + 'api/user/reset/password?' + params
		);
		httpController.expectNone(
			service.ROOT_URL + 'api/user/reset/password?' + params
		);
	});

	it('should update password', () => {
		service
			.resetPassword('id', 'oldpassword', 'newpassword')
			.subscribe((result) => {
				expect(result).toBeTruthy();
			});
		const req = httpController.expectOne(
			service.ROOT_URL + '/api/user/update/password/id'
		);

		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual({
			oldPassword: 'oldpassword',
			newPassword: 'newpassword',
		});

		req.flush({});
	});

	it('should search by email', () => {
		service.searchUserByEmail('email').subscribe((result) => {
			expect(result).toBeTruthy();
			expect(result.email).toEqual('email');
		});
		const req = httpController.expectOne(
			service.ROOT_URL + '/api/user/search/email'
		);

		expect(req.request.method).toBe('GET');

		req.flush({
			id: 'userid',
			fullName: 'Test',
			email: 'email',
			gender: 'male',
			phone: '07123',
			isActive: true,
			photo: 'photo',
		});
	});

	it('should update user', () => {
		service
			.updateUser(
				'id',
				'fullname',
				'email',
				'gender',
				'phone',
				'birth',
				'address',
				'photo',
				true
			)
			.subscribe((result) => {
				expect(result).toBeTruthy();
			});
		const req = httpController.expectOne(service.ROOT_URL + '/api/User/id');
		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual({
			fullName: 'fullname',
			email: 'email',
			gender: 'gender',
			phone: 'phone',
			dateOfBirth: 'birth',
			address: 'address',
			photo: 'photo',
			isActive: true,
		});

		req.flush({
			fullName: 'fullname',
			email: 'email',
			gender: 'gender',
			phone: 'phone',
			dateOfBirth: 'birth',
			address: 'address',
			photo: 'photo',
			isActive: true,
		});
	});

	it('should deactivate user', () => {
		service.deactivateUser('userid', false).subscribe((result) => {
			expect(result).toBeTruthy();
		});
		const req = httpController.expectOne(service.ROOT_URL + '/api/user/userid');
		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual({ isActive: false });

		req.flush({});
	});

	it('should update  user name', () => {
		service.updateFullName('userid', 'fullname').subscribe((result) => {
			expect(result).toBeTruthy();
		});
		const req = httpController.expectOne(service.ROOT_URL + '/api/user/userid');
		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual({ fullName: 'fullname' });

		req.flush({});
	});

	it('should update user gender', () => {
		service.updateGender('userid', 'gender').subscribe((result) => {
			expect(result).toBeTruthy();
		});
		const req = httpController.expectOne(service.ROOT_URL + '/api/user/userid');
		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual({ gender: 'gender' });

		req.flush({});
	});

	it('should update user birthdate', () => {
		service.updateBirthDate('userid', 'birthDate').subscribe((result) => {
			expect(result).toBeTruthy();
		});
		const req = httpController.expectOne(service.ROOT_URL + '/api/user/userid');
		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual({ dateOfBirth: 'birthDate' });

		req.flush({});
	});

	it('should update user email', () => {
		service.updateEmail('userid', 'email').subscribe((result) => {
			expect(result).toBeTruthy();
		});
		const req = httpController.expectOne(service.ROOT_URL + '/api/user/userid');
		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual({ email: 'email' });

		req.flush({});
	});

	it('should update user phone', () => {
		service.updatePhone('userid', 'phone').subscribe((result) => {
			expect(result).toBeTruthy();
		});
		const req = httpController.expectOne(service.ROOT_URL + '/api/user/userid');
		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual({ phone: 'phone' });

		req.flush({});
	});

	it('should update user address', () => {
		service.updateAddress('userid', 'address').subscribe((result) => {
			expect(result).toBeTruthy();
		});
		const req = httpController.expectOne(service.ROOT_URL + '/api/user/userid');
		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual({ address: 'address' });

		req.flush({});
	});

	it('should update user photo', () => {
		service.updatePhoto('userid', 'photo').subscribe((result) => {
			expect(result).toBeTruthy();
		});
		const req = httpController.expectOne(service.ROOT_URL + '/api/user/userid');
		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual({ photo: 'photo' });

		req.flush({});
	});

	it('should update user password', () => {
		service.updatePassword('userid', 'password').subscribe((result) => {
			expect(result).toBeTruthy();
		});
		const req = httpController.expectOne(service.ROOT_URL + '/api/user/userid');
		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual({ password: 'password' });

		req.flush({});
	});
});
