import { TestBed } from '@angular/core/testing';

import { ListingService } from './listing.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListingService', () => {
	let service: ListingService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
		});
		service = TestBed.inject(ListingService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
