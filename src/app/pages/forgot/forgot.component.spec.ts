import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ForgotComponent } from './forgot.component';

describe('ForgotComponent', () => {
	let component: ForgotComponent;
	let fixture: ComponentFixture<ForgotComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ForgotComponent],
			imports: [RouterTestingModule, HttpClientTestingModule],
		}).compileComponents();

		fixture = TestBed.createComponent(ForgotComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
