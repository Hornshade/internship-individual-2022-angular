import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Listing } from '../../interfaces/listing';
import { PageEvent } from '@angular/material/paginator';
import { ListingService } from '../../services/listings/listing.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';

@Component({
	selector: 'app-cards',
	templateUrl: './cards.component.html',
	styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
	listings: Listing[] = [];
	gridView: boolean = true;
	category: string | null = 'Category';
	@Input() categorySelected = '';
	pageSlice = this.listings.slice(0.4);
	selectedCategory!: string | null;
	selectedLocation!: string[];
	selectedPrice!: string;
	selectedOrder!: string;
	urlCategory!: string;
	favorites: Listing[] = [];

	isLogged: boolean = false;
	userId!: string | null;

	//search variables
	search: boolean = false;
	resultCount: number = 0;
	searchString: string | null = null;

	//have to change route later to /category
	constructor(
		private listingsService: ListingService,
		private route: ActivatedRoute,
		private loginService: LoginService,
		private favoriteService: FavoriteService
	) {
		this.userId = localStorage.getItem('userId');
		this.searchString = this.route.snapshot.paramMap.get('searchString');
		if (this.searchString !== null) this.search = true;
	}

	ngOnInit(): void {
		this.loginService.isLoggedIn.subscribe(
			(logged) => (this.isLogged = logged)
		);

		this.listingsService.currentCategory.subscribe((selectedCategory) => {
			this.selectedCategory = selectedCategory;
			if (selectedCategory === 'big') {
				this.category = 'Big Houses';
			} else if (selectedCategory === 'small') {
				this.category = 'Small Houses';
			} else if (selectedCategory === 'latest') {
				this.category = 'Latest';
			}
		});
		this.listingsService.currentLocation.subscribe(
			(selectedLocation) => (this.selectedLocation = selectedLocation)
		);
		this.listingsService.currentPrice.subscribe(
			(selectedPrice) => (this.selectedPrice = selectedPrice)
		);
		this.listingsService.currentOrder.subscribe(
			(selectedOrder) => (this.selectedOrder = selectedOrder)
		);

		if (this.searchString === null) {
			this.listingsService.currentListing.subscribe((listing) => {
				this.listings = listing;
				this.pageSlice = this.listings.slice(0, 4);
			});
		} else {
			this.listingsService.getListings().subscribe((data) => {
				data.map((result) => {
					if (this.searchString !== null) {
						if (
							result.title
								.toLowerCase()
								.includes(this.searchString.toLowerCase())
						) {
							this.listings.push(result);
							this.resultCount++;
						}
					}
					this.pageSlice = this.listings.slice(0, 4);
				});
			});
		}
		if (this.isLogged) {
			if (this.userId !== null)
				this.favoriteService.getFavorite(this.userId).subscribe((data) => {
					this.favorites = data;
				});
		}
	}

	onPageChange(event: PageEvent) {
		const startIndex = event.pageIndex * event.pageSize;
		let endIndex = startIndex + event.pageSize;
		if (endIndex > this.listings.length) {
			endIndex = this.listings.length;
		}
		this.pageSlice = this.listings.slice(startIndex, endIndex);
	}
	getFavStatus(id: string) {
		return this.favorites.findIndex((fav) => {
			return fav.id === id;
		}) !== -1
			? true
			: false;
	}
}
