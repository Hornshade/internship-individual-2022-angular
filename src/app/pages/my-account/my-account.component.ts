import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
	selector: 'app-my-account',
	templateUrl: './my-account.component.html',
	styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
	profile: boolean = true;
	security: boolean = false;
	notifications: boolean = false;
	chat: boolean = false;
	myImage: any;

	constructor(
		private router: Router,
		private loginService: LoginService,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.loginService
			.getUserById(localStorage.getItem('userId'))
			.subscribe((data) => {
				this.myImage = data.photo;
			});
		if (this.activatedRoute.snapshot.paramMap.get('tab') === 'profile') {
			this.toggle('profile');
		} else if (
			this.activatedRoute.snapshot.paramMap.get('tab') === 'security'
		) {
			this.toggle('security');
		} else if (
			this.activatedRoute.snapshot.paramMap.get('tab') === 'notifications'
		) {
			this.toggle('notifications');
		} else if (this.activatedRoute.snapshot.paramMap.get('tab') === 'chat') {
			this.toggle('chat');
		}
	}

	logout() {
		localStorage.clear();
		this.router.navigate(['']).then(() => {
			window.location.reload();
		});
	}

	toggle(content: string) {
		switch (content) {
			case 'profile':
				this.router.navigate(['my-account/profile']);
				this.profile = true;
				this.security = false;
				this.notifications = false;
				this.chat = false;
				break;
			case 'security':
				this.router.navigate(['my-account/security']);
				this.profile = false;
				this.security = true;
				this.notifications = false;
				this.chat = false;
				break;
			case 'notifications':
				this.router.navigate(['my-account/notifications']);
				this.profile = false;
				this.security = false;
				this.notifications = true;
				this.chat = false;
				break;
			case 'chat':
				this.router.navigate(['my-account/chat']);
				this.profile = false;
				this.security = false;
				this.notifications = false;
				this.chat = true;
				break;
		}
	}

	onChange(e: any) {
		const file = (e.target as HTMLInputElement).files
			? (e.target as HTMLInputElement).files![0]
			: null;

		this.convertToBase64(file);
	}

	convertToBase64(file: File | null) {
		const observable = new Observable((subscriber: Subscriber<any>) => {
			this.readFile(file, subscriber);
		});
		observable.subscribe((data) => {
			this.myImage = data;
			const convertPhoto = String(data).split(',');
			this.loginService
				.updatePhoto(localStorage.getItem('userId'), convertPhoto[1])
				.subscribe();
		});
	}

	readFile(file: File | null, subscriber: Subscriber<any>) {
		const filereader = new FileReader();
		if (file) filereader.readAsDataURL(file);

		filereader.onload = () => {
			subscriber.next(filereader.result);
			subscriber.complete();
		};
		filereader.onerror = (error) => {
			subscriber.error(error);
			subscriber.complete();
		};
	}
}
