import { AfterViewInit, Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
	user!: User | null;

	isLogged!: boolean;
	userId: string | null = '';

	constructor(
		private loginService: LoginService,
		private router: Router,
		private activeRoute: ActivatedRoute
	) {
		this.userId = localStorage.getItem('userId');
	}

	ngOnInit(): void {
		this.loginService.isLoggedIn.subscribe(
			(logged) => (this.isLogged = logged)
		);
	}
	ngAfterViewInit(): void {
		if (this.userId !== null) {
			this.loginService.getUserById(this.userId).subscribe((data) => {
				this.user = data;
			});
		}
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
