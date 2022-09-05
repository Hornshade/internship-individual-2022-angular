import { AfterViewInit, Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
	user!: User | null;

	isLogged!: boolean;
	userId: string | null = '';

	firebaseUser!: Observable<User[]>;

	constructor(
		private loginService: LoginService,
		private router: Router,
		firestore: Firestore
	) {
		this.userId = localStorage.getItem('userId');
		const collectionFire = collection(firestore, 'users');
		this.firebaseUser = collectionData(collectionFire) as Observable<User[]>;
		this.firebaseUser.forEach((firebs) => {
			firebs.map((usr) => {
				this.user = usr;
			});
		});
	}

	ngOnInit(): void {
		if (localStorage.getItem('userId') === '0') this.isLogged = true;
		// this.loginService.isLoggedIn.subscribe(
		// 	(logged) => (this.isLogged = logged)
		// );
	}
	ngAfterViewInit(): void {
		// if (this.userId !== null) {
		// 	this.loginService.getUserById(this.userId).subscribe((data) => {
		// 		this.user = data;
		// 	});
		// }
	}

	logout() {
		localStorage.clear();

		this.router.navigate(['']);
		location.reload();
	}

	searchListing(searchString: string) {
		this.router
			.navigate(['search', searchString])
			.then(() => location.reload());
	}
}
