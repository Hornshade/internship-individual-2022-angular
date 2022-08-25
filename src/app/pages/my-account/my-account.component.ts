import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
	constructor(private router: Router) {}

	ngOnInit(): void {}

	logout() {
		localStorage.clear();
		this.router.navigate(['']).then(() => {
			window.location.reload();
		});
	}

	toggle(content: string) {
		switch (content) {
			case 'profile':
				this.profile = true;
				this.security = false;
				this.notifications = false;
				this.chat = false;
				break;
			case 'security':
				this.profile = false;
				this.security = true;
				this.notifications = false;
				this.chat = false;
				break;
			case 'notification':
				this.profile = false;
				this.security = false;
				this.notifications = true;
				this.chat = false;
				break;
			case 'chat':
				this.profile = false;
				this.security = false;
				this.notifications = false;
				this.chat = true;
				break;
		}
	}
}
