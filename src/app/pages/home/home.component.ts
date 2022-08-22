import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	user!: User | null;
	gridView: boolean = false;
	selectedCategory!: string | null;
	selectedLocation!: string[];
	selectedPrice!: string;
	selectedOrder!: string;
	myListings = 0;

	isLogged: boolean = false;
	userId!: string | null;
	constructor(private loginService: LoginService) {}

	ngOnInit(): void {
		this.userId = localStorage.getItem('userId');
		this.loginService.isLoggedIn.subscribe(
			(logged) => (this.isLogged = logged)
		);
		if (this.userId !== null)
			this.loginService.getUserById(this.userId).subscribe((data) => {
				this.user = data;
				if (data !== null) this.myListings = data.listings?.length;
			});
		this.loginService.currentUser.subscribe((data) => {
			if (data !== null) {
				this.user = data;
				this.myListings = data.listings.length;
			}
		});
	}

	isUser() {
		if (this.user?.role === 0) {
			return true;
		} else return false;
	}
	isAdmin() {
		if (this.user?.role === 1) {
			return true;
		} else return false;
	}
}
