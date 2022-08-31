import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
	selector: 'app-preview',
	templateUrl: './preview.component.html',
	styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
	fullName: string = '';
	createdAt: string = '';
	constructor(
		private loginService: LoginService,
		private dialogRef: MatDialogRef<PreviewComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			title: string;
			price: number;
			description: string;
			images: string[];
			location: string;
			author: string;
			editShow: boolean;
		}
	) {}

	ngOnInit(): void {
		this.loginService.getUserById(this.data.author).subscribe((result) => {
			this.fullName = result.fullName;
			this.createdAt = result.createdAt.substring(0, 10);
		});
	}

	closeDialog() {
		this.dialogRef.close();
	}
}
