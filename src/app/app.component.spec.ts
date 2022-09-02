import { TestBed } from '@angular/core/testing';
import { FirebaseAppModule, provideFirebaseApp } from '@angular/fire/app';
import { FirestoreModule, provideFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				FirebaseAppModule,
				FirestoreModule,
				provideFirebaseApp(() => initializeApp(environment.firebase)),
				provideFirestore(() => getFirestore()),
			],
			declarations: [AppComponent],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have as title 'internship-individual-2022-angular'`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app.title).toEqual('internship-individual-2022-angular');
	});

	it('should render title', () => {
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.querySelector('.content span')?.textContent).toContain(
			'internship-individual-2022-angular app is running!'
		);
	});
});
