import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Listing } from 'src/app/interfaces/listing';
import { User } from 'src/app/interfaces/user';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';
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
	favorites: Listing[] = [];

	isLogged: boolean = false;
	userId!: string | null;
	constructor(
		private loginService: LoginService,
		private favoriteService: FavoriteService
	) {
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
		if (this.isLogged) {
			if (this.userId !== null)
				this.favoriteService.getFavorite(this.userId).subscribe((data) => {
					this.favorites = data;
				});
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
	getFavStatus(id: string) {
		return this.favorites.findIndex((fav) => {
			return fav.id === id;
		}) !== -1
			? true
			: false;
	}
}
