import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Listing } from '../../interfaces/listing';
import { ListingService } from 'src/app/services/listings/listing.service';
import { MatDialog } from '@angular/material/dialog';
import { GaleryModalComponent } from 'src/app/components/modal/galery-modal/galery-modal.component';
import { FavoriteModalComponent } from 'src/app/components/modal/favorite-modal/favorite-modal.component';

@Component({
	selector: 'app-single',
	templateUrl: './single.component.html',
	styleUrls: ['./single.component.scss'],
})
export class SingleComponent implements OnInit {
	listing = {} as Listing;
	urlId!: string | null;

	constructor(
		private route: ActivatedRoute,
		private listingsService: ListingService,
		public dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.urlId = this.route.snapshot.paramMap.get('id');
		console.log(this.urlId);
		this.listingsService
			.getListingById(this.urlId)
			.subscribe((data) => (this.listing = data));
	}

	openDialog() {
		const dialogRef = this.dialog.open(GaleryModalComponent, {
			height: '100%',
			width: '100%',
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
		// if user logged in add to favorite
		// else
		this.openFavoriteDialog();
	}
}
