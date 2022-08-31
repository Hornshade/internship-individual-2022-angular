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
	changeEmailId(id: string) {
		this.emailIdSource.next(id);
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

	resetPassword(id: string | null, oldPassword: string, newPassword: string) {
		return this.http
			.put(
				this.ROOT_URL + '/api/user/update/password/' + id,
				{ oldPassword: oldPassword, newPassword: newPassword },
				{ headers: this.header }
			)
			.pipe(
				tap(() => localStorage.removeItem('emailId')),
				catchError(this.handleError)
			);
	}

	searchUserByEmail(email: string): Observable<User> {
		return this.http
			.get<User>(this.ROOT_URL + '/api/user/search/' + email, {
				headers: this.header,
			})
			.pipe(
				tap((response) => {
					this.emailIdSource.next(response.id);
					localStorage.setItem('emailId', response.id);
					this.changeEmailId(response.id);
				}),
				catchError(this.handleError)
			);
	}

	updateUser(
		id: string | null,
		fullName: string,
		email: string,
		gender: string,
		phone: string,
		birthDate: string,
		address: string,
		photo: string,
		isActive: boolean
	) {
		return this.http
			.put(
				this.ROOT_URL + '/api/User/' + id,
				{
					fullName: fullName,
					email: email,
					gender: gender,
					phone: phone,
					dateOfBirth: birthDate,
					address: address,
					photo: photo,
					isActive: isActive,
				},
				{ headers: this.header }
			)
			.pipe(catchError(this.handleError));
	}

	deactivateUser(id: string | null, isActive: boolean) {
		return this.http
			.put(
				this.ROOT_URL + '/api/user/' + id,
				{ isActive: isActive },
				{ headers: this.header }
			)
			.pipe(catchError(this.handleError));
	}

	updateFullName(id: string | null, fullName: string) {
		return this.http
			.put(
				this.ROOT_URL + '/api/user/' + id,
				{ fullName: fullName },
				{ headers: this.header }
			)
			.pipe(catchError(this.handleError));
	}
	updateGender(id: string | null, gender: string) {
		return this.http
			.put(
				this.ROOT_URL + '/api/user/' + id,
				{
					gender: gender,
				},
				{ headers: this.header }
			)
			.pipe(catchError(this.handleError));
	}
	updateBirthDate(id: string | null, dateOfBirth: string) {
		return this.http
			.put(
				this.ROOT_URL + '/api/user/' + id,
				{ dateOfBirth: dateOfBirth },
				{ headers: this.header }
			)
			.pipe(catchError(this.handleError));
	}
	updateEmail(id: string | null, email: string) {
		return this.http
			.put(
				this.ROOT_URL + '/api/user/' + id,
				{ email: email },
				{ headers: this.header }
			)
			.pipe(catchError(this.handleError));
	}
	updatePhone(id: string | null, phone: string) {
		return this.http
			.put(
				this.ROOT_URL + '/api/user/' + id,
				{ phone: phone },
				{ headers: this.header }
			)
			.pipe(catchError(this.handleError));
	}
	updateAddress(id: string | null, address: string) {
		return this.http
			.put(
				this.ROOT_URL + '/api/user/' + id,
				{ address: address },
				{ headers: this.header }
			)
			.pipe(catchError(this.handleError));
	}
	updatePhoto(id: string | null, photo: string) {
		return this.http
			.put(
				this.ROOT_URL + '/api/user/' + id,
				{ photo: photo },
				{ headers: this.header }
			)
			.pipe(catchError(this.handleError));
	}
	updatePassword(id: string | null, password: string) {
		return this.http
			.put(
				this.ROOT_URL + '/api/user/' + id,
				{ password: password },
				{ headers: this.header }
			)
			.pipe(catchError(this.handleError));
	}
}
