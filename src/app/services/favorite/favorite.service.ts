import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Listing } from 'src/app/interfaces/listing';

@Injectable({
	providedIn: 'root',
})
export class FavoriteService {
	readonly ROOT_URL: string = 'http://assist-jully-2022-be2.azurewebsites.net';
	readonly header = new HttpHeaders({
		'Content-Type': 'application/json',
		Accept: 'application/json',
	});

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

	getFavorite(userId: string | null): Observable<Listing[]> {
		return this.http
			.get<Listing[]>(this.ROOT_URL + '/api/Favorite/' + userId, {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Accept: '*/*',
				}),
			})
			.pipe(catchError(this.handleError));
	}

	addToFavorites(userId: string | null, listingId: string) {
		return this.http
			.post(
				this.ROOT_URL + '/api/Favorite/addToFavorites',
				{
					userId: userId,
					listingId: listingId,
				},
				{
					headers: new HttpHeaders({
						Accept: 'application/json',
						'Content-Type': 'application/json',
					}),
				}
			)
			.pipe(catchError(this.handleError));
	}

	deleteFavorite(userId: string | null, listingId: string) {
		return this.http
			.delete(this.ROOT_URL + '/api/Favorite/' + userId + '/' + listingId, {
				headers: new HttpHeaders({ Accept: '*/*' }),
			})
			.pipe(catchError(this.handleError));
	}
}
