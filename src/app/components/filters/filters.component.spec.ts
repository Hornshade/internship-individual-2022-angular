import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
	let component: FiltersComponent;
	let fixture: ComponentFixture<FiltersComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FiltersComponent],
			imports: [HttpClientTestingModule],
		}).compileComponents();

		fixture = TestBed.createComponent(FiltersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
