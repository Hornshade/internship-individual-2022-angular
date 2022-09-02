import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseAppModule, provideFirebaseApp } from '@angular/fire/app';
import { FirestoreModule, provideFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

import { CardsComponent } from './cards.component';

describe('CardsComponent', () => {
	let component: CardsComponent;
	let fixture: ComponentFixture<CardsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CardsComponent],
			imports: [
				HttpClientTestingModule,
				RouterTestingModule,
				FirebaseAppModule,
				FirestoreModule,
				provideFirebaseApp(() => initializeApp(environment.firebase)),
				provideFirestore(() => getFirestore()),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(CardsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
