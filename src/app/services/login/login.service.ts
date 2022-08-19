import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Injectable({
	providedIn: 'root',
})
export class LoginService {
	readonly ROOT_URL: string = 'http://assist-jully-2022-be2.azurewebsites.net';
	readonly header = new HttpHeaders({
		'Content-Type': 'application/json',
		Accept: '*/*',
	});

	private isLoggedInSource = new BehaviorSubject<boolean>(false);
	isLoggedIn = this.isLoggedInSource.asObservable();

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

	constructor(private http: HttpClient) {
		const token = localStorage.getItem('userToken');
		this.isLoggedInSource.next(!!token);
	}

	authenticateUser(email: string, password: string): Observable<User> {
		return this.http
			.post<User>(
				this.ROOT_URL + '/api/user/authenticate',
				{
					email: email,
					password: password,
				},
				{ headers: this.header }
			)
			.pipe(
				tap((response) => {
					this.isLoggedInSource.next(true);
					localStorage.setItem('userToken', response.token);
				}),
				catchError(this.handleError)
			);
	}
}
