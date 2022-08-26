import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationModalComponent } from 'src/app/components/modal/notification-modal/notification-modal.component';

@Component({
	selector: 'app-notifications',
	templateUrl: './notifications.component.html',
	styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
	newsOptions = { emailToggle: false, smsToggle: false };
	newsDescription = 'Off';
	discountsOptions = { emailToggle: false, smsToggle: false };
	discountDescription = 'Off';

	messagesOptions = { emailToggle: false, smsToggle: false };
	messagesDescription = 'Off';

	listingsOptions = { emailToggle: false, smsToggle: false };
	listingsDescription = 'Off';

	pricesOptions = { emailToggle: false, smsToggle: false };
	pricesDescription = 'Off';

	constructor(public dialog: MatDialog) {}

	ngOnInit(): void {}

	openDialog(title: string) {
		let description = '';
		let emailToggle = false;
		let smsToggle = false;
		if (title === 'News') {
			description =
				'Tips on how to sell quicker, interesting news and offers from us and our partners.';
			emailToggle = this.newsOptions.emailToggle;
			smsToggle = this.newsOptions.smsToggle;
		} else if (title === 'Discounts & promotions') {
			description =
				'Notifications about promotions and discounts offered by us for our services.';
			emailToggle = this.discountsOptions.emailToggle;
			smsToggle = this.discountsOptions.smsToggle;
		} else if (title === 'Messages') {
			description =
				'Be notified when you are contacted by somebody through a message';
			emailToggle = this.messagesOptions.emailToggle;
			smsToggle = this.messagesOptions.smsToggle;
		} else if (title === 'New listings') {
			description = 'Get notifications when new listings are posted';
			emailToggle = this.listingsOptions.emailToggle;
			smsToggle = this.listingsOptions.smsToggle;
		} else if (title === 'Price change') {
			description =
				'Be the first to know about a price change by activating notifications';
			emailToggle = this.pricesOptions.emailToggle;
			smsToggle = this.pricesOptions.smsToggle;
		}

		let dialogRef = this.dialog.open(NotificationModalComponent, {
			data: {
				title: title,
				description: description,
				emailToggle: emailToggle,
				smsToggle: smsToggle,
			},
			disableClose: true,
			width: '355px',
			height: '355px',
		});
		dialogRef.afterClosed().subscribe((result) => {
			if (result.title === 'News') {
				this.newsOptions.emailToggle = result.email;
				this.newsOptions.smsToggle = result.sms;
				if (result.email || result.sms) this.newsDescription = 'On';
				else this.newsDescription = 'Off';
			} else if (result.title === 'Discounts & promotions') {
				this.discountsOptions.emailToggle = result.email;
				this.discountsOptions.smsToggle = result.sms;
				if (result.email || result.sms) this.discountDescription = 'On';
				else this.discountDescription = 'Off';
			} else if (result.title === 'Messages') {
				this.messagesOptions.emailToggle = result.email;
				this.messagesOptions.smsToggle = result.sms;
				if (result.email || result.sms) this.messagesDescription = 'On';
				else this.messagesDescription = 'Off';
			} else if (result.title === 'New listings') {
				this.listingsOptions.emailToggle = result.email;
				this.listingsOptions.smsToggle = result.sms;
				if (result.email || result.sms) this.listingsDescription = 'On';
				else this.listingsDescription = 'Off';
			} else if (result.title === 'Price change') {
				this.pricesOptions.emailToggle = result.email;
				this.pricesOptions.smsToggle = result.sms;
				if (result.email || result.sms) this.pricesDescription = 'On';
				else this.pricesDescription = 'Off';
			}
		});
	}
}
