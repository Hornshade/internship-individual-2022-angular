import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ListingService } from 'src/app/services/listings/listing.service';

import { Listing } from '../../interfaces/listing';

@Component({
	selector: 'app-carousel',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
	@Input() category: string = '';
	@Input() favorites: Listing[] = [];

	listings: Listing[] = [];
	favor: boolean = false;

	customOptions: OwlOptions = {
		loop: true,
		autoWidth: true,
		mouseDrag: false,
		touchDrag: false,
		pullDrag: false,
		dots: false,
		navSpeed: 700,
		navText: [
			'<img src="../../../assets/icons/chevron-left.svg" alt="left">',
			'<img src="../../../assets/icons/chevron-right.svg" alt="right">',
		],

		responsive: {
			0: {
				items: 1,
			},
			400: {
				items: 2,
			},
			740: {
				items: 3,
			},
			940: {
				items: 4,
			},
		},
		nav: true,
	};

	constructor(private listingsServices: ListingService) {}

	ngOnInit(): void {
		this.listingsServices
			.getListingsSort(this.category, [], '', '')
			.subscribe((data) => (this.listings = data));
	}

	getFavStatus(id: string) {
		return this.favorites.findIndex((fav) => {
			return fav.id === id;
		}) !== -1
			? true
			: false;
	}
}
