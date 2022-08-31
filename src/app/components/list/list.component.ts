import { Component, Input, OnInit } from '@angular/core';
import { Listing } from '../../interfaces/listing';
import { MatDialog } from '@angular/material/dialog';
import { FavoriteModalComponent } from '../modal/favorite-modal/favorite-modal.component';
import { DeleteModalComponent } from '../modal/delete-modal/delete-modal.component';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
	@Input() listing!: Listing;
	@Input() favorite: boolean = false;
	@Input() role: number = 0;
	@Input() showButtons: boolean = false;
	isLogged: boolean = false;

	constructor(
		public dialog: MatDialog,
		private favoriteService: FavoriteService,
		private loginService: LoginService
	) {}

	ngOnInit(): void {
		this.loginService.isLoggedIn.subscribe(
			(logged) => (this.isLogged = logged)
		);
		//aici ruleaza de foarte multe ori, nu stiu cum sa-l fac mai eficient
		this.favoriteService
			.getFavorite(localStorage.getItem('userId'))
			.subscribe((data) => {
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
	openDeleteDialog() {
		const dialogRef = this.dialog.open(DeleteModalComponent);

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
