import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { SingleComponent } from './single.component';

describe('SingleComponent', () => {
	let component: SingleComponent;
	let fixture: ComponentFixture<SingleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SingleComponent],
			imports: [RouterTestingModule, HttpClientTestingModule, MatDialogModule],
		}).compileComponents();

		fixture = TestBed.createComponent(SingleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
