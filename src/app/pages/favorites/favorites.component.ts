import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Listing } from 'src/app/interfaces/listing';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';

@Component({
	selector: 'app-favorites',
	templateUrl: './favorites.component.html',
	styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
	listings: Listing[] = [];
	urlId!: string | null;
	favorite: boolean = true;
	checkEmpty: boolean = true;
	gridView: boolean = true;
	pageSlice = this.listings.slice(0, 4);

	constructor(
		private favoriteService: FavoriteService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.urlId = this.route.snapshot.paramMap.get('userId');
		this.favoriteService.getFavorite(this.urlId).subscribe((data) => {
			if (data.length != 0) {
				this.checkEmpty = false;
				this.listings = data;
				this.pageSlice = data.slice(0, 4);
			} else {
				this.checkEmpty = true;
			}
		});
	}
	setGridView() {
		this.gridView = true;
	}
	setListView() {
		this.gridView = false;
	}

	onPageChange(event: PageEvent) {
		const startIndex = event.pageIndex * event.pageSize;
		let endIndex = startIndex + event.pageSize;
		if (endIndex > this.listings.length) {
			endIndex = this.listings.length;
		}
		this.pageSlice = this.listings.slice(startIndex, endIndex);
	}
}
