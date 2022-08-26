import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-notification-modal',
	templateUrl: './notification-modal.component.html',
	styleUrls: ['./notification-modal.component.scss'],
})
export class NotificationModalComponent implements OnInit {
	email: boolean = false;
	sms: boolean = false;

	constructor(
		private dialogRef: MatDialogRef<NotificationModalComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			title: string;
			description: string;
			emailToggle: boolean;
			smsToggle: boolean;
		}
	) {
		this.email = data.emailToggle;
		this.sms = data.smsToggle;
	}

	ngOnInit(): void {}

	closeDialog() {
		let result = { title: this.data.title, email: this.email, sms: this.sms };
		this.dialogRef.close(result);
	}
}
