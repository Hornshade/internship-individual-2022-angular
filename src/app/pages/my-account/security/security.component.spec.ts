import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityComponent } from './security.component';

describe('SecurityComponent', () => {
	let component: SecurityComponent;
	let fixture: ComponentFixture<SecurityComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SecurityComponent],
			imports: [HttpClientTestingModule],
		}).compileComponents();

		fixture = TestBed.createComponent(SecurityComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
