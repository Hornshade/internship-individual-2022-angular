import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';

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
});
