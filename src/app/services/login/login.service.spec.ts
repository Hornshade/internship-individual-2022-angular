import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { HttpParams } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';

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
		const mockData: User = {
			id: 'userid',
			fullName: 'Test',
			email: 'user@user.com',
			gender: 1,
			phone: '07123',
			isActive: true,
			photo: 'photo',
			password: 'useruser',
			role: 0,
			dateOfBirth: 'string',
			createdAt: 'string',
			address: 'string',
			userActivities: {
				id: 'usr',
				device: 'windows',
				deviceType: 'devicetype',
				location: 'loc',
				connectionDate: 'string',
				status: 0,
			},
			token: 'asda',
			google: false,
			updatedAt: 'string',
			listings: [],
		};

		service
			.authenticateUser('user@user.com', 'useruser')
			.subscribe((result) => {
				expect(result).toBeTruthy();
				expect(result).toEqual(mockData);
			});
		const req = httpController.expectOne(
			'http://assist-jully-2022-be2.azurewebsites.net/api/user/authenticate'
		);
		expect(req.request.method).toBe('POST');
		req.flush(mockData);
	});
	//aici nu a schimbat coverage %
	it('should get user by id', () => {
		const mockData: User = {
			id: 'userid',
			fullName: 'Test',
			email: 'user@user.com',
			gender: 1,
			phone: '07123',
			isActive: true,
			photo: 'photo',
			password: 'useruser',
			role: 0,
			dateOfBirth: 'string',
			createdAt: 'string',
			address: 'string',
			userActivities: {
				id: 'usr',
				device: 'windows',
				deviceType: 'devicetype',
				location: 'loc',
				connectionDate: 'string',
				status: 0,
			},
			token: 'asda',
			google: false,
			updatedAt: 'string',
			listings: [],
		};
		service.getUserById('userid').subscribe((result) => {
			expect(result).toBeTruthy();
			expect(result.id).toEqual('userid');
			expect(result).toEqual(mockData);
		});

		const req = httpController.expectOne(service.ROOT_URL + '/api/user/userid');

		expect(req.request.method).toBe('GET');

		req.flush(mockData);
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
		params = params.append('email', 'email@test.com');
		service.forgotPassword('email@test.com').subscribe((result) => {
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
		const bodyReq = {
			oldPassword: 'oldpassword',
			newPassword: 'newpassword',
		};
		const mockData: User = {
			id: 'userid',
			fullName: 'Test',
			email: 'user@user.com',
			gender: 1,
			phone: '07123',
			isActive: true,
			photo: 'photo',
			password: 'newpassword',
			role: 0,
			dateOfBirth: 'string',
			createdAt: 'string',
			address: 'string',
			userActivities: {
				id: 'usr',
				device: 'windows',
				deviceType: 'devicetype',
				location: 'loc',
				connectionDate: 'string',
				status: 0,
			},
			token: 'asda',
			google: false,
			updatedAt: 'string',
			listings: [],
		};
		service
			.resetPassword('id', 'oldpassword', 'newpassword')
			.subscribe((result) => {
				expect(result).toBeTruthy();
				expect(result).toEqual(mockData);
			});
		const req = httpController.expectOne(
			service.ROOT_URL + '/api/user/update/password/id'
		);

		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual(bodyReq);

		req.flush(mockData);
	});

	it('should search by email', () => {
		const mockData: User = {
			id: 'userid',
			fullName: 'Test',
			email: 'email@test.com',
			gender: 1,
			phone: '07123',
			isActive: true,
			photo: 'photo',
			password: 'newpassword',
			role: 0,
			dateOfBirth: 'string',
			createdAt: 'string',
			address: 'string',
			userActivities: {
				id: 'usr',
				device: 'windows',
				deviceType: 'devicetype',
				location: 'loc',
				connectionDate: 'string',
				status: 0,
			},
			token: 'asda',
			google: false,
			updatedAt: 'string',
			listings: [],
		};
		service.searchUserByEmail('email@test.com').subscribe((result) => {
			expect(result).toBeTruthy();
			expect(result).toEqual(mockData);
			expect(result.email).toEqual('email@test.com');
		});
		const req = httpController.expectOne(
			service.ROOT_URL + '/api/user/search/email@test.com'
		);

		expect(req.request.method).toBe('GET');

		req.flush(mockData);
	});

	it('should update user', () => {
		const mockData: User = {
			id: 'id',
			fullName: 'fullname',
			email: 'email@test.com',
			gender: 1,
			phone: 'phone',
			isActive: true,
			photo: 'photo',
			password: 'newpassword',
			role: 0,
			dateOfBirth: 'birth',
			createdAt: 'string',
			address: 'address',
			userActivities: {
				id: 'usr',
				device: 'windows',
				deviceType: 'devicetype',
				location: 'loc',
				connectionDate: 'string',
				status: 0,
			},
			token: 'asda',
			google: false,
			updatedAt: 'string',
			listings: [],
		};
		const bodyReq = {
			fullName: 'fullname',
			email: 'email@test.com',
			gender: 'gender',
			phone: 'phone',
			dateOfBirth: 'birth',
			address: 'address',
			photo: 'photo',
			isActive: true,
		};
		service
			.updateUser(
				'id',
				'fullname',
				'email@test.com',
				'gender',
				'phone',
				'birth',
				'address',
				'photo',
				true
			)
			.subscribe((result) => {
				expect(result).toBeTruthy();
				expect(result).toEqual(mockData);
			});
		const req = httpController.expectOne(service.ROOT_URL + '/api/User/id');
		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual(bodyReq);

		req.flush(mockData);
	});

	it('should deactivate user', () => {
		const mockData: User = {
			id: 'userid',
			fullName: 'fullname',
			email: 'email@test.com',
			gender: 1,
			phone: 'phone',
			isActive: false,
			photo: 'photo',
			password: 'newpassword',
			role: 0,
			dateOfBirth: 'birth',
			createdAt: 'string',
			address: 'address',
			userActivities: {
				id: 'usr',
				device: 'windows',
				deviceType: 'devicetype',
				location: 'loc',
				connectionDate: 'string',
				status: 0,
			},
			token: 'asda',
			google: false,
			updatedAt: 'string',
			listings: [],
		};
		service.deactivateUser('userid', false).subscribe((result) => {
			expect(result).toBeTruthy();
		});
		const req = httpController.expectOne(service.ROOT_URL + '/api/user/userid');
		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual({ isActive: false });

		req.flush(mockData);
	});

	it('should update  user name', () => {
		const mockData: User = {
			id: 'userid',
			fullName: 'fullname',
			email: 'email@test.com',
			gender: 1,
			phone: 'phone',
			isActive: true,
			photo: 'photo',
			password: 'newpassword',
			role: 0,
			dateOfBirth: 'birth',
			createdAt: 'string',
			address: 'address',
			userActivities: {
				id: 'usr',
				device: 'windows',
				deviceType: 'devicetype',
				location: 'loc',
				connectionDate: 'string',
				status: 0,
			},
			token: 'asda',
			google: false,
			updatedAt: 'string',
			listings: [],
		};
		service.updateFullName('userid', 'fullname').subscribe((result) => {
			expect(result).toBeTruthy();
			expect(result).toEqual(mockData);
		});
		const req = httpController.expectOne(service.ROOT_URL + '/api/user/userid');
		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual({ fullName: 'fullname' });

		req.flush(mockData);
	});

	it('should update user gender', () => {
		const mockData: User = {
			id: 'userid',
			fullName: 'fullname',
			email: 'email@test.com',
			gender: 1,
			phone: 'phone',
			isActive: true,
			photo: 'photo',
			password: 'newpassword',
			role: 0,
			dateOfBirth: 'birth',
			createdAt: 'string',
			address: 'address',
			userActivities: {
				id: 'usr',
				device: 'windows',
				deviceType: 'devicetype',
				location: 'loc',
				connectionDate: 'string',
				status: 0,
			},
			token: 'asda',
			google: false,
			updatedAt: 'string',
			listings: [],
		};
		service.updateGender('userid', 'gender').subscribe((result) => {
			expect(result).toBeTruthy();
			expect(result).toEqual(mockData);
		});
		const req = httpController.expectOne(service.ROOT_URL + '/api/user/userid');
		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual({ gender: 'gender' });

		req.flush(mockData);
	});

	it('should update user birthdate', () => {
		const mockData: User = {
			id: 'userid',
			fullName: 'fullname',
			email: 'email@test.com',
			gender: 1,
			phone: 'phone',
			isActive: true,
			photo: 'photo',
			password: 'newpassword',
			role: 0,
			dateOfBirth: 'birthDate',
			createdAt: 'string',
			address: 'address',
			userActivities: {
				id: 'usr',
				device: 'windows',
				deviceType: 'devicetype',
				location: 'loc',
				connectionDate: 'string',
				status: 0,
			},
			token: 'asda',
			google: false,
			updatedAt: 'string',
			listings: [],
		};
		service.updateBirthDate('userid', 'birthDate').subscribe((result) => {
			expect(result).toBeTruthy();
			expect(result).toEqual(mockData);
		});
		const req = httpController.expectOne(service.ROOT_URL + '/api/user/userid');
		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual({ dateOfBirth: 'birthDate' });

		req.flush(mockData);
	});

	it('should update user email', () => {
		const mockData: User = {
			id: 'userid',
			fullName: 'fullname',
			email: 'email@test.com',
			gender: 1,
			phone: 'phone',
			isActive: true,
			photo: 'photo',
			password: 'newpassword',
			role: 0,
			dateOfBirth: 'birth',
			createdAt: 'string',
			address: 'address',
			userActivities: {
				id: 'usr',
				device: 'windows',
				deviceType: 'devicetype',
				location: 'loc',
				connectionDate: 'string',
				status: 0,
			},
			token: 'asda',
			google: false,
			updatedAt: 'string',
			listings: [],
		};
		service.updateEmail('userid', 'email@test.com').subscribe((result) => {
			expect(result).toBeTruthy();
			expect(result).toEqual(mockData);
		});
		const req = httpController.expectOne(service.ROOT_URL + '/api/user/userid');
		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual({ email: 'email@test.com' });

		req.flush(mockData);
	});

	it('should update user phone', () => {
		const mockData: User = {
			id: 'userid',
			fullName: 'fullname',
			email: 'email@test.com',
			gender: 1,
			phone: 'phone',
			isActive: true,
			photo: 'photo',
			password: 'newpassword',
			role: 0,
			dateOfBirth: 'birth',
			createdAt: 'string',
			address: 'address',
			userActivities: {
				id: 'usr',
				device: 'windows',
				deviceType: 'devicetype',
				location: 'loc',
				connectionDate: 'string',
				status: 0,
			},
			token: 'asda',
			google: false,
			updatedAt: 'string',
			listings: [],
		};
		service.updatePhone('userid', 'phone').subscribe((result) => {
			expect(result).toBeTruthy();
			expect(result).toEqual(mockData);
		});
		const req = httpController.expectOne(service.ROOT_URL + '/api/user/userid');
		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual({ phone: 'phone' });

		req.flush(mockData);
	});

	it('should update user address', () => {
		const mockData: User = {
			id: 'userid',
			fullName: 'fullname',
			email: 'email@test.com',
			gender: 1,
			phone: 'phone',
			isActive: true,
			photo: 'photo',
			password: 'newpassword',
			role: 0,
			dateOfBirth: 'birth',
			createdAt: 'string',
			address: 'address',
			userActivities: {
				id: 'usr',
				device: 'windows',
				deviceType: 'devicetype',
				location: 'loc',
				connectionDate: 'string',
				status: 0,
			},
			token: 'asda',
			google: false,
			updatedAt: 'string',
			listings: [],
		};
		service.updateAddress('userid', 'address').subscribe((result) => {
			expect(result).toBeTruthy();
			expect(result).toEqual(mockData);
		});
		const req = httpController.expectOne(service.ROOT_URL + '/api/user/userid');
		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual({ address: 'address' });

		req.flush(mockData);
	});

	it('should update user photo', () => {
		const mockData: User = {
			id: 'userid',
			fullName: 'fullname',
			email: 'email@test.com',
			gender: 1,
			phone: 'phone',
			isActive: true,
			photo: 'photo',
			password: 'newpassword',
			role: 0,
			dateOfBirth: 'birth',
			createdAt: 'string',
			address: 'address',
			userActivities: {
				id: 'usr',
				device: 'windows',
				deviceType: 'devicetype',
				location: 'loc',
				connectionDate: 'string',
				status: 0,
			},
			token: 'asda',
			google: false,
			updatedAt: 'string',
			listings: [],
		};
		service.updatePhoto('userid', 'photo').subscribe((result) => {
			expect(result).toBeTruthy();
			expect(result).toEqual(mockData);
		});
		const req = httpController.expectOne(service.ROOT_URL + '/api/user/userid');
		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual({ photo: 'photo' });

		req.flush(mockData);
	});

	it('should update user password', () => {
		const mockData: User = {
			id: 'id',
			fullName: 'fullname',
			email: 'email@test.com',
			gender: 1,
			phone: 'phone',
			isActive: true,
			photo: 'photo',
			password: 'password',
			role: 0,
			dateOfBirth: 'birth',
			createdAt: 'string',
			address: 'address',
			userActivities: {
				id: 'usr',
				device: 'windows',
				deviceType: 'devicetype',
				location: 'loc',
				connectionDate: 'string',
				status: 0,
			},
			token: 'asda',
			google: false,
			updatedAt: 'string',
			listings: [],
		};
		service.updatePassword('userid', 'password').subscribe((result) => {
			expect(result).toBeTruthy();
			expect(result).toEqual(mockData);
		});
		const req = httpController.expectOne(service.ROOT_URL + '/api/user/userid');
		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual({ password: 'password' });

		req.flush(mockData);
	});

	afterEach(() => {
		httpController.verify();
	});
});
