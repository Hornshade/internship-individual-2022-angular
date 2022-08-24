import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
	HttpParams,
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
	private userSource = new BehaviorSubject<User | null>(null);
	currentUser = this.userSource.asObservable();

	private userIdSource = new BehaviorSubject<string>('');
	currentUserId = this.userIdSource.asObservable();
	private emailIdSource = new BehaviorSubject<string>('');
	currentEmailId = this.emailIdSource.asObservable();

	private handleError(error: HttpErrorResponse) {
		if (error.status === 400)
			return throwError(() => new Error('This user already exists'));
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
	changeUser(user: User) {
		this.userSource.next(user);
	}
	changeUserId(userId: string) {
		this.userIdSource.next(userId);
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
					localStorage.setItem('userId', response.id);
					this.changeUser(response);
					this.userIdSource.next(response.id);
				}),
				catchError(this.handleError)
			);
	}

	getUserById(id: string | null): Observable<User> {
		return this.http
			.get<User>(this.ROOT_URL + '/api/user/' + id, {
				headers: this.header,
			})
			.pipe(catchError(this.handleError));
	}

	signupUser(email: string, password: string) {
		let params = new HttpParams();
		if (email) params = params.append('email', email);
		if (password) params = params.append('password', password);

		return this.http
			.post(
				this.ROOT_URL + '/api/user/register?' + params,
				{},
				{ headers: this.header }
			)
			.pipe(catchError(this.handleError));
	}

	forgotPassword(email: string) {
		let params = new HttpParams();
		if (email) params = params.append('email', email);
		return this.http
			.post(
				this.ROOT_URL + '/api/user/reset/password?' + params,
				{},
				{ headers: this.header }
			)
			.pipe(catchError(this.handleError));
	}

	resetPassword(id: string, oldPassword: string, newPassword: string) {
		return this.http
			.put(
				this.ROOT_URL + '/api/user/update/password/' + id,
				{ oldPassword: oldPassword, newPassword: newPassword },
				{ headers: this.header }
			)
			.pipe(catchError(this.handleError));
	}

	searchUserByEmail(email: string): Observable<User> {
		return this.http
			.get<User>(this.ROOT_URL + '/api/user/search/' + email, {
				headers: this.header,
			})
			.pipe(
				tap((response) => {
					this.emailIdSource.next(response.id);
				}),
				catchError(this.handleError)
			);
	}
}
