import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseAppModule, provideFirebaseApp } from '@angular/fire/app';
import { FirestoreModule, provideFirestore } from '@angular/fire/firestore';
import { By } from '@angular/platform-browser';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { Observable, of } from 'rxjs';
import { Listing } from 'src/app/interfaces/listing';
import { ListingService } from 'src/app/services/listings/listing.service';
import { environment } from 'src/environments/environment';
import { CardComponent } from '../card/card.component';

import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
	let component: CarouselComponent;
	let fixture: ComponentFixture<CarouselComponent>;
	let listingService: any;

	const mockData = {
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
	};
	// const sortedListing = mockData.filter(
	// 	(listing) => listing.category == 'string'
	// );
	beforeEach(async () => {
		const listingServiceSpy = jasmine.createSpyObj('ListingService', [
			'getListingsSort',
		]);
		await TestBed.configureTestingModule({
			declarations: [CarouselComponent, CardComponent],
			imports: [
				HttpClientTestingModule,
				FirebaseAppModule,
				FirestoreModule,
				provideFirebaseApp(() => initializeApp(environment.firebase)),
				provideFirestore(() => getFirestore()),
			],
			providers: [{ provide: ListingService, useValue: listingServiceSpy }],
		}).compileComponents();
		fixture = TestBed.createComponent(CarouselComponent);
		component = fixture.componentInstance;
		listingService = TestBed.inject(ListingService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display carousel', () => {
		let listings: Listing[] = [
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
		// listingService.getListingsSort.and.returnValue(of(sortedListing));
		listingService.getListingsSort().subscribe((data: any) => {
			expect(data).toEqual(listings);
		});
	});

	it('should get fav status', () => {
		const spy = spyOn(component, 'getFavStatus');
		fixture.detectChanges();

		component.getFavStatus('id');
		expect(component.getFavStatus).toHaveBeenCalledWith(mockData.id);
	});
});
