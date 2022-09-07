import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
	MatDialogModule,
	MatDialogRef,
	MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { GaleryModalComponent } from './galery-modal.component';

describe('GaleryModalComponent', () => {
	let component: GaleryModalComponent;
	let fixture: ComponentFixture<GaleryModalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [GaleryModalComponent],
			imports: [MatDialogModule, HttpClientTestingModule],
			providers: [
				{ provide: MatDialogRef, useValue: {} },
				{ provide: MAT_DIALOG_DATA, useValue: {} },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(GaleryModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
