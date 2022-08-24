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
	@Input() listing!: Listing | null;
	@Input() favorite: boolean = false;
	@Input() role: number = 0;

	isLogged: boolean = false;
	userId!: string | null;

	constructor(
		public dialog: MatDialog,
		private loginService: LoginService,
		private favoriteService: FavoriteService
	) {
		if (localStorage.getItem('userId') !== null)
			this.userId = localStorage.getItem('userId');
	}

	ngOnInit(): void {
		this.loginService.isLoggedIn.subscribe((data) => (this.isLogged = data));
	}
	ngAfterViewInit(): void {}

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
					.deleteFavorite(
						localStorage.getItem('userId'),
						String(this.listing?.id)
					)
					.subscribe();
				this.favorite = false;
			} else if (this.favorite === false) {
				this.favoriteService
					.addToFavorites(
						localStorage.getItem('userId'),
						String(this.listing?.id)
					)
					.subscribe();
				this.favorite = true;
			}
		} else {
			this.openDialog;
		}
	}
}
