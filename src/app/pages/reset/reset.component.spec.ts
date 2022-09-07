import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ResetComponent } from './reset.component';

describe('ResetComponent', () => {
	let component: ResetComponent;
	let fixture: ComponentFixture<ResetComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ResetComponent],
			imports: [RouterTestingModule, HttpClientTestingModule],
		}).compileComponents();

		fixture = TestBed.createComponent(ResetComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
