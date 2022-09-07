import { TestBed } from '@angular/core/testing';

import { ListingService } from './listing.service';
import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { HttpParams } from '@angular/common/http';
import { Listing } from 'src/app/interfaces/listing';

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
		const mockListings: Listing[] = [
			{
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
			},
		];

		service.getListings().subscribe((listings) => {
			expect(listings).toBeTruthy();
			expect(listings.length).toBeGreaterThanOrEqual(1);
			expect(listings).toEqual(mockListings);
		});
		const req = httpTestingController.expectOne(
			'http://assist-jully-2022-be2.azurewebsites.net/api/Listing'
		);

		expect(req.request.method).toEqual('GET');

		req.flush(mockListings);
	});

	it('should get listing by id', () => {
		const mockListings: Listing[] = [
			{
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
			},
		];
		service.getListingById('string').subscribe((listing) => {
			expect(listing).toBeTruthy();
			expect(listing.id).toBe('string');
			expect(listing).toEqual(mockListings[0]);
		});
		const req = httpTestingController.expectOne(
			'http://assist-jully-2022-be2.azurewebsites.net/api/Listing/string'
		);

		expect(req.request.method).toEqual('GET');

		req.flush(mockListings[0]);
	});

	it('should add listing', () => {
		const bodyReq = {
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
		};
		service
			.addListing('title', 'desc', 'loc', 0, ['str', 'str'], 'cat', 'auth')
			.subscribe((res) => {
				expect(res).toBeTruthy();
			});

		const req = httpTestingController.expectOne(
			service.ROOT_URL + '/api/listing/create'
		);
		expect(req.request.method).toBe('POST');
		expect(req.request.body).toEqual(bodyReq);

		req.flush(bodyReq);
	});
	it('should edit listing', () => {
		const bodyReq = {
			title: 'title',
			description: 'desc',
			shortDescription: '',
			location: ['loc'],
			price: 0,
			status: 0,
			images: ['str', 'str'],
			category: 'cat',
		};
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
		expect(req.request.body).toEqual(bodyReq);

		req.flush(bodyReq);
	});

	//expected null to equal 'order' error, something about the get value at 175 returns null
	//after creating mock object coverage % dropped
	it('should get sorted listings', () => {
		let param = new HttpParams();
		param = param.append('SortOrder', 'order');
		param = param.append('LocationFilter', 'loc');
		param = param.append('PriceRange', '0-10000');
		param = param.append('Category', 'category');
		service
			.getListingsSort('category', ['loc'], '0-10000', 'order')
			.subscribe((result) => {
				expect(result).toBeTruthy();
				expect(result.length).toBeGreaterThanOrEqual(0);
			});

		const req = httpTestingController.expectOne(
			service.ROOT_URL + '/api/Listing/sort?' + param
		);

		expect(req.request.method).toEqual('GET');

		expect(req.request.params.get('SortOrder')).toEqual('order');
		expect(req.request.params.get('LocationFilter')).toEqual('loc');
		expect(req.request.params.get('Category')).toEqual('category');
		expect(req.request.params.get('PriceRange')).toEqual('0-10000');

		req.flush({
			title: 'title',
			description: 'desc',
			shortDescription: '',
			location: ['loc'],
			price: 10,
			status: 0,
			images: ['str', 'str'],
			category: 'category',
		});
	});

	afterEach(() => {
		httpTestingController.verify();
	});
});
