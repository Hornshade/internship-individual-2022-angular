import { TestBed } from '@angular/core/testing';

import { FavoriteService } from './favorite.service';
import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Listing } from 'src/app/interfaces/listing';

describe('FavoriteService', () => {
	let service: FavoriteService;
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [FavoriteService],
		});
		service = TestBed.inject(FavoriteService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should get all favourites', () => {
		const mockData: Listing[] = [
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
		service.getFavorite('string').subscribe((favorites) => {
			expect(favorites).toBeTruthy();
			expect(favorites.length).toBeGreaterThanOrEqual(0);
			expect(favorites).toEqual(mockData);
		});
		const req = httpTestingController.expectOne(
			'http://assist-jully-2022-be2.azurewebsites.net/api/Favorite/' + 'string'
		);
		expect(req.request.method).toEqual('GET');

		req.flush(mockData);
	});

	it('should add favorite', () => {
		service.addToFavorites('userid', 'listingid').subscribe((result) => {
			expect(result).toBeTruthy();
		});

		const req = httpTestingController.expectOne(
			'http://assist-jully-2022-be2.azurewebsites.net/api/Favorite/addToFavorites'
		);
		expect(req.request.method).toEqual('POST');

		expect(req.request.body.userId).toEqual('userid');
		expect(req.request.body.listingId).toEqual('listingid');

		req.flush({ ok: 'ok' });
	});

	it('should delete favorite', () => {
		service.deleteFavorite('userid', 'listingid').subscribe((result) => {
			expect(result).toBeTruthy();
		});
		const req = httpTestingController.expectOne(
			'http://assist-jully-2022-be2.azurewebsites.net/api/Favorite/userid/listingid'
		);
		expect(req.request.method).toEqual('DELETE');

		req.flush({ ok: 'ok' });
	});

	afterEach(() => {
		httpTestingController.verify();
	});
});
