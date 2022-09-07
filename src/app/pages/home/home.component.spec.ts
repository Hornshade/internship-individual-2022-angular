import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseAppModule, provideFirebaseApp } from '@angular/fire/app';
import { FirestoreModule, provideFirestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HomeComponent],
			imports: [
				HttpClientTestingModule,
				FirebaseAppModule,
				FirestoreModule,
				provideFirebaseApp(() => initializeApp(environment.firebase)),
				provideFirestore(() => getFirestore()),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
