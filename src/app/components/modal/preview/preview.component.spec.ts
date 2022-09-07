import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
	MatDialogModule,
	MatDialogRef,
	MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { PreviewComponent } from './preview.component';

describe('PreviewComponent', () => {
	let component: PreviewComponent;
	let fixture: ComponentFixture<PreviewComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PreviewComponent],
			imports: [HttpClientTestingModule, MatDialogModule],
			providers: [
				{ provide: MatDialogRef, useValue: {} },
				{ provide: MAT_DIALOG_DATA, useValue: {} },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(PreviewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
