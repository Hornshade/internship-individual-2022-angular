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
	//if the listing is defined with [] the carousel shows an error about not having enough slides.
	// listings: Listing[] = [
	// 	{
	// 		id: '0',
	// 		title: '',
	// 		description: '',
	// 		location: [],
	// 		shortDescription: '',
	// 		price: 0,
	// 		status: 0,
	// 		images: [],
	// 		category: '',
	// 		viewCouter: 0,
	// 		createdAt: '',
	// 		updatedAt: '',
	// 		author: { id: '0', photo: '', fullName: '', createdAt: '' },
	// 	},
	// 	{
	// 		id: '1',
	// 		title: '',
	// 		description: '',
	// 		location: [],
	// 		shortDescription: '',
	// 		price: 0,
	// 		status: 0,
	// 		images: [],
	// 		category: '',
	// 		viewCouter: 0,
	// 		createdAt: '',
	// 		updatedAt: '',
	// 		author: { id: '0', photo: '', fullName: '', createdAt: '' },
	// 	},
	// 	{
	// 		id: '2',
	// 		title: '',
	// 		description: '',
	// 		location: [],
	// 		shortDescription: '',
	// 		price: 0,
	// 		status: 0,
	// 		images: [],
	// 		category: '',
	// 		viewCouter: 0,
	// 		createdAt: '',
	// 		updatedAt: '',
	// 		author: { id: '0', photo: '', fullName: '', createdAt: '' },
	// 	},
	// 	{
	// 		id: '3',
	// 		title: '',
	// 		description: '',
	// 		location: [],
	// 		shortDescription: '',
	// 		price: 0,
	// 		status: 0,
	// 		images: [],
	// 		category: '',
	// 		viewCouter: 0,
	// 		createdAt: '',
	// 		updatedAt: '',
	// 		author: { id: '0', photo: '', fullName: '', createdAt: '' },
	// 	},
	// 	{
	// 		id: '4',
	// 		title: '',
	// 		description: '',
	// 		location: [],
	// 		shortDescription: '',
	// 		price: 0,
	// 		status: 0,
	// 		images: [],
	// 		category: '',
	// 		viewCouter: 0,
	// 		createdAt: '',
	// 		updatedAt: '',
	// 		author: { id: '0', photo: '', fullName: '', createdAt: '' },
	// 	},
	// ];
	listings: Listing[] = [];

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
}
