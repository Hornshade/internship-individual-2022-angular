import { TestBed } from '@angular/core/testing';

import { ListingService } from './listing.service';
import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';

describe('ListingService', () => {
	let service: ListingService;
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
		});
		service = TestBed.inject(ListingService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should get all listings', () => {
		service.getListings().subscribe((listings) => {
			expect(listings).toBeTruthy();
			// expect(listings.length).toBeGreaterThanOrEqual(0);
		});
		const req = httpTestingController.expectOne(
			'http://assist-jully-2022-be2.azurewebsites.net/api/Listing'
		);

		expect(req.request.method).toEqual('GET');

		req.flush({
			id: 'string',
			title: 'string',
			description: 'string',
			shortDescription: 'string',
			location: ['asd', 'ads'],
			price: 0,
			status: 1,
			images: ['str', 'str'],
			category: 'string',
			author: {
				id: 'string',
				photo: 'string',
				fullName: 'string',
				createdAt: 'string',
			},
			viewCounter: 0,
			createdAt: 'string',
			updatedAt: 'string',
		});
	});

	it('should get listing by id', () => {
		service.getListingById('string').subscribe((listing) => {
			expect(listing).toBeTruthy();
			expect(listing.id).toBe('string');
		});
		const req = httpTestingController.expectOne(
			'http://assist-jully-2022-be2.azurewebsites.net/api/Listing/string'
		);

		expect(req.request.method).toEqual('GET');

		req.flush({
			id: 'string',
			title: 'string',
			description: 'string',
			shortDescription: 'string',
			location: ['asd', 'ads'],
			price: 0,
			status: 1,
			images: ['str', 'str'],
			category: 'string',
			author: {
				id: 'string',
				photo: 'string',
				fullName: 'string',
				createdAt: 'string',
			},
			viewCounter: 0,
			createdAt: 'string',
			updatedAt: 'string',
		});
	});

	it('should add listing', () => {
		service
			.addListing('title', 'desc', 'loc', 0, ['str', 'str'], 'cat', 'auth')
			.subscribe((res) => {
				expect(res).toBeTruthy();
			});

		const req = httpTestingController.expectOne(
			service.ROOT_URL + '/api/listing/create'
		);
		expect(req.request.method).toBe('POST');
		expect(req.request.body).toEqual({
			title: 'title',
			description: 'desc',
			shortDescription: '',
			location: ['loc'],
			price: 0,
			status: 0,
			images: ['str', 'str'],
			category: 'cat',
			viewCounter: 0,
			author: 'auth',
		});

		req.flush({});
	});
	//aici imi scade % la coverage dar nu stiu de ce
	it('should edit listing', () => {
		service
			.editListing(
				'title',
				'desc',
				'loc',
				0,
				['str', 'str'],
				'cat',
				'listingid'
			)
			.subscribe((res) => {
				expect(res).toBeTruthy();
			});
		const req = httpTestingController.expectOne(
			service.ROOT_URL + '/api/listing/listingid'
		);
		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual({
			title: 'title',
			description: 'desc',
			shortDescription: '',
			location: ['loc'],
			price: 0,
			status: 0,
			images: ['str', 'str'],
			category: 'cat',
		});

		req.flush({});
	});

	afterEach(() => {
		httpTestingController.verify();
	});
});
