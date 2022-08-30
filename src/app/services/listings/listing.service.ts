import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
	HttpParams,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Listing } from '../../interfaces/listing';

@Injectable({
	providedIn: 'root',
})
export class ListingService {
	readonly ROOT_URL: string = 'http://assist-jully-2022-be2.azurewebsites.net';
	readonly header = new HttpHeaders({
		'Content-Type': 'application/json',
		Accept: 'application/json',
	});
	private listingSource = new BehaviorSubject<Listing[]>([]);
	currentListing = this.listingSource.asObservable();
	//dropdown options to communicate between any components
	private categorySource = new BehaviorSubject<string | null>('');
	private locationSource = new BehaviorSubject<string[]>([]);
	private priceSource = new BehaviorSubject<string>('');
	private orderSource = new BehaviorSubject<string>('Popular');
	currentCategory = this.categorySource.asObservable();
	currentLocation = this.locationSource.asObservable();
	currentPrice = this.priceSource.asObservable();
	currentOrder = this.orderSource.asObservable();

	private handleError(error: HttpErrorResponse) {
		if (error.status === 0) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error('An error occurred:', error.error);
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong.
			console.error(
				`Backend returned code ${error.status}, body was: `,
				error.error
			);
		}
		// Return an observable with a user-facing error message.
		return throwError(
			() => new Error('Something bad happened; please try again later.')
		);
	}

	constructor(private http: HttpClient) {}
	//function to change the listing variable on change and be accessed globaly
	changeListing(listing: Listing[]) {
		this.listingSource.next(listing);
	}

	//dropdown options change functions to update the values
	changeCategory(selectedCategory: string | null) {
		this.categorySource.next(selectedCategory);
	}
	changeLocation(selectedLocation: string[]) {
		this.locationSource.next(selectedLocation);
	}
	changePrice(selectedPrice: string) {
		this.priceSource.next(selectedPrice);
	}
	changeOrder(selectedOrder: string) {
		this.orderSource.next(selectedOrder);
	}

	// endpoint to get all the listings from de backend
	getListings(): Observable<Listing[]> {
		return this.http
			.get<Listing[]>(this.ROOT_URL + '/api/Listing')
			.pipe(catchError(this.handleError));
	}

	// endpoint to get the listings sorted from the backend
	getListingsSort(
		category: string | null,
		location: string[],
		price: string,
		order: string
	): Observable<Listing[]> {
		let params = new HttpParams();
		if (order.length > 0 && !params.has('SortOrder')) {
			params = params.append('SortOrder', order);
		} else if (order.length == 0 && params.has('SortOrder')) {
			params = params.delete('SortOrder', price);
		}

		if (location.length != 0) {
			location.map((loc) => (params = params.append('LocationFilter', loc)));
		}

		if (price && !params.has('PriceRange')) {
			params = params.append('PriceRange', price);
		} else if (params.has('PriceRange')) {
			params = params.delete('PriceRange', price);
		}

		if (category && !params.has('Category')) {
			params = params.append('Category', category);
		}
		return this.http
			.get<Listing[]>(this.ROOT_URL + '/api/Listing/sort?' + params, {
				headers: this.header,
			})
			.pipe(catchError(this.handleError));
	}

	// endpoint to get listings by id
	getListingById(id: string | null): Observable<Listing> {
		return this.http
			.get<Listing>(this.ROOT_URL + '/api/Listing/' + id, {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Accept: '*/*',
				}),
			})
			.pipe(catchError(this.handleError));
	}
	//endpoint to add listings
	addListing(
		title: string,
		description: string,
		location: string,
		price: number,
		images: (string | null)[],
		category: string,
		author: string | null
	) {
		return this.http
			.post(
				this.ROOT_URL + '/api/listing/create',
				{
					title: title,
					description: description,
					shortDescription: '',
					location: [location],
					price: price,
					status: 0,
					images: images,
					category: category,
					viewCounter: 0,
					author: author,
				},
				{ headers: { Accept: '*/*', 'Content-Type': 'application/json' } }
			)
			.pipe(catchError(this.handleError));
	}
	//endpoint to edit listings
	editListing(
		title: string,
		description: string,
		location: string,
		price: number,
		images: (string | null)[],
		category: string
	) {
		return this.http
			.put(
				this.ROOT_URL + '/api/listing/create',
				{
					title: title,
					description: description,
					shortDescription: '',
					location: [location],
					price: price,
					status: 0,
					images: images,
					category: category,
				},
				{ headers: { Accept: '*/*', 'Content-Type': 'application/json' } }
			)
			.pipe(catchError(this.handleError));
	}
}
