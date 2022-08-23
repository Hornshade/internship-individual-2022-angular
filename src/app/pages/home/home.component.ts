import { AfterViewInit, Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
	user!: User | null;
	gridView: boolean = false;
	selectedCategory!: string | null;
	selectedLocation!: string[];
	selectedPrice!: string;
	selectedOrder!: string;
	myListings = 0;

	isLogged: boolean = false;
	userId!: string | null;
	constructor(private loginService: LoginService) {
		this.userId = localStorage.getItem('userId');
	}

	ngOnInit(): void {
		this.loginService.isLoggedIn.subscribe(
			(logged) => (this.isLogged = logged)
		);
	}
	ngAfterViewInit(): void {
		if (this.isLogged) {
			if (this.userId !== null) {
				this.loginService.getUserById(this.userId).subscribe((data) => {
					this.user = data;
					this.myListings = data.listings?.length;
				});
			}
		}
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
