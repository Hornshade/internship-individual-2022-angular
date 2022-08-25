import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-notifications',
	templateUrl: './notifications.component.html',
	styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
	showNews: boolean = false;
	constructor() {}

	ngOnInit(): void {}
}
