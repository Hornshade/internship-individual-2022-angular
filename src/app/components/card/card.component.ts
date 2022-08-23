import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Listing } from '../../interfaces/listing';
import { MatDialog } from '@angular/material/dialog';
import { FavoriteModalComponent } from '../modal/favorite-modal/favorite-modal.component';
import { LoginService } from 'src/app/services/login/login.service';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, AfterViewInit {
	@Input() listing!: Listing;
	@Input() favorite: boolean = false;
	@Input() role: number = 0;

	isLogged: boolean = false;
	userId!: string | null;

	constructor(
		public dialog: MatDialog,
		private loginService: LoginService,
		private favoriteService: FavoriteService
	) {}

	ngOnInit(): void {
		this.loginService.isLoggedIn.subscribe(
			(logged) => (this.isLogged = logged)
		);

		this.userId = localStorage.getItem('userId');
		// this.loginService.currentUserId.subscribe((data) => (this.userId = data));
	}
	ngAfterViewInit(): void {
		//aici ruleaza de foarte multe ori, nu stiu cum sa-l fac mai eficient
		// if (this.isLogged)
		// 	this.favoriteService.getFavorite(this.userId).subscribe((data) => {
		// 		data.map((fav) => {
		// 			if (fav !== null)
		// 				if (fav.id === this.listing.id) {
		// 					this.favorite = true;
		// 				}
		// 		});
		// 	});
		if (this.isLogged)
			this.favoriteService.getFavorite(this.userId).subscribe((data) => {
				data.map((fav) => {
					if (fav !== null)
						if (fav.id === this.listing.id) {
							this.favorite = true;
						}
				});
			});
	}

	openDialog() {
		const dialogRef = this.dialog.open(FavoriteModalComponent);

		dialogRef.afterClosed().subscribe((result) => {
			console.log(`Dialog result: ${result}`);
		});
	}

	setFavorite() {
		if (this.isLogged) {
			if (this.favorite === true) {
				this.favoriteService
					.deleteFavorite(localStorage.getItem('userId'), this.listing.id)
					.subscribe();
				this.favorite = false;
			} else if (this.favorite === false) {
				this.favoriteService
					.addToFavorites(localStorage.getItem('userId'), this.listing.id)
					.subscribe();
				this.favorite = true;
			}
		} else {
			this.openDialog;
		}
	}
}
