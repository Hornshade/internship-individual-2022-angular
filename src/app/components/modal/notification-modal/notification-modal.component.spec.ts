import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
	MatDialogModule,
	MatDialogRef,
	MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { NotificationModalComponent } from './notification-modal.component';

describe('NotificationModalComponent', () => {
	let component: NotificationModalComponent;
	let fixture: ComponentFixture<NotificationModalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NotificationModalComponent],
			imports: [MatDialogModule],
			providers: [
				{ provide: MatDialogRef, useValue: {} },
				{ provide: MAT_DIALOG_DATA, useValue: {} },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(NotificationModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
