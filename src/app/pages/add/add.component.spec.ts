import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ListingService } from 'src/app/services/listings/listing.service';

import { AddComponent } from './add.component';

describe('AddComponent', () => {
	const listingServiceSpy = jasmine.createSpyObj<ListingService>([
		'getListingById',
		'addListing',
		'editListing',
	]);
	let component: AddComponent;
	let fixture: ComponentFixture<AddComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AddComponent],
			imports: [
				RouterTestingModule,
				HttpClientTestingModule,
				FormsModule,
				ReactiveFormsModule,
				MatDialogModule,
				MatSelectModule,
				MatInputModule,
				BrowserAnimationsModule,
			],
		}).compileComponents();

		fixture = TestBed.createComponent(AddComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
