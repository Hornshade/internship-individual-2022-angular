import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
	let component: DropdownComponent;
	let fixture: ComponentFixture<DropdownComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DropdownComponent],
			imports: [HttpClientTestingModule, RouterTestingModule],
		}).compileComponents();

		fixture = TestBed.createComponent(DropdownComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
