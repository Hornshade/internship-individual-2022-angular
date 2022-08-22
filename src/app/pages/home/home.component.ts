import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	user!: User;
	gridView: boolean = false;
	selectedCategory!: string | null;
	selectedLocation!: string[];
	selectedPrice!: string;
	selectedOrder!: string;

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
			});
		this.loginService.currentUser.subscribe((data) => {
			if (data !== null) this.user = data;
		});
	}

	isUser() {
		if (this.user.role === 0) {
			return true;
		} else return false;
	}
	isAdmin() {
		if (this.user.role === 1) {
			return true;
		} else return false;
	}
}
