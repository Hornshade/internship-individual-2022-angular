import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';
import { LoginService } from 'src/app/services/login/login.service';
import { FavoriteModalComponent } from '../modal/favorite-modal/favorite-modal.component';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
	let component: CardComponent;
	let fixture: ComponentFixture<CardComponent>;
	let el: DebugElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CardComponent, FavoriteModalComponent],
			imports: [MatDialogModule, HttpClientTestingModule],
			providers: [LoginService, FavoriteService],
		}).compileComponents();

		fixture = TestBed.createComponent(CardComponent);
		component = fixture.componentInstance;
		el = fixture.debugElement;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display the card', () => {
		component.listing = {
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
		const listing = component.listing;

		const card = el.query(By.css('.c-card:first-child')),
			title = card.query(By.css('.c-card__content--title')),
			image = card.query(By.css('.c-card__image')),
			location = card.query(By.css('.c-card__content--location')),
			price = card.query(By.css('.c-card__content--price'));

		expect(card).toBeTruthy();
		expect(title.nativeElement.textContent).toBe(listing.title);
		expect(image.nativeElement.src).toBe(listing.images[0]);
		expect(location.nativeElement.textContent).toBe(listing.location[0]);
		expect(price.nativeElement.textContent).toBe(listing.price + ' lei');
	});
});
