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
	gridView: boolean = true;
	selectedCategory!: string | null;
	selectedLocation!: string[];
	selectedPrice!: string;
	selectedOrder!: string;

	isLogged: boolean = false;
	userId!: string | null;
	constructor(private loginService: LoginService) {}

	ngOnInit(): void {
		//my listings

		//user
		this.userId = localStorage.getItem('userId');
		this.loginService.isLoggedIn.subscribe(
			(logged) => (this.isLogged = logged)
		);
		this.loginService.getUserById(this.userId).subscribe((data) => {
			this.user = data;
		});
	}
}
