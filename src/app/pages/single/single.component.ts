import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Listing } from '../../interfaces/listing';
import { ListingService } from 'src/app/services/listings/listing.service';
import { MatDialog } from '@angular/material/dialog';
import { GaleryModalComponent } from 'src/app/components/modal/galery-modal/galery-modal.component';
import { FavoriteModalComponent } from 'src/app/components/modal/favorite-modal/favorite-modal.component';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
	selector: 'app-single',
	templateUrl: './single.component.html',
	styleUrls: ['./single.component.scss'],
})
export class SingleComponent implements OnInit {
	listing = {} as Listing;
	urlId!: string | null;
	favorites: Listing[] = [];

	isLogged: boolean = false;
	favorite: boolean = false;
	userId!: string | null;

	constructor(
		private route: ActivatedRoute,
		private listingsService: ListingService,
		private loginService: LoginService,
		private favoriteService: FavoriteService,
		public dialog: MatDialog
	) {
		this.userId = localStorage.getItem('userId');
	}

	ngOnInit(): void {
		this.loginService.isLoggedIn.subscribe((data) => (this.isLogged = data));
		this.urlId = this.route.snapshot.paramMap.get('id');
		this.listingsService
			.getListingById(this.urlId)
			.subscribe((data) => (this.listing = data));
		if (this.isLogged) {
			if (this.userId !== null)
				this.favoriteService.getFavorite(this.userId).subscribe((data) => {
					this.favorites = data;
				});
		}
	}

	openDialog() {
		const dialogRef = this.dialog.open(GaleryModalComponent, {
			height: '100%',
			width: '100%',
			maxWidth: '100vw',
			data: {
				images: this.listing.images,
			},
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log(`Dialog result: ${result}`);
		});
	}

	openFavoriteDialog() {
		const dialogRef = this.dialog.open(FavoriteModalComponent);

		dialogRef.afterClosed().subscribe((result) => {
			console.log(`Dialog result: ${result}`);
		});
	}

	scrollToBottom() {
		window.scrollTo(0, document.body.scrollHeight);
	}

	addToFavorite() {
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
			this.openFavoriteDialog();
		}
	}
	getFavStatus(id: string) {
		return this.favorites.findIndex((fav) => {
			return fav.id === id;
		}) !== -1
			? true
			: false;
	}
}
