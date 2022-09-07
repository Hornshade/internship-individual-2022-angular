import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FavoritesComponent } from './favorites.component';

describe('FavoritesComponent', () => {
	let component: FavoritesComponent;
	let fixture: ComponentFixture<FavoritesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FavoritesComponent],
			imports: [HttpClientTestingModule, RouterTestingModule],
		}).compileComponents();

		fixture = TestBed.createComponent(FavoritesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
