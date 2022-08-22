import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	user!: User;

	isLogged: boolean = false;
	userId!: string | null;

	constructor(private loginService: LoginService, private router: Router) {}

	ngOnInit(): void {
		this.userId = localStorage.getItem('userId');
		this.loginService.isLoggedIn.subscribe(
			(logged) => (this.isLogged = logged)
		);
		this.loginService.getUserById(this.userId).subscribe((data) => {
			this.user = data;
		});
	}

	logout() {
		localStorage.removeItem('userToken');
		localStorage.removeItem('userId');
		console.log('logout');

		this.router.navigate(['']);
		location.reload();
	}
}
