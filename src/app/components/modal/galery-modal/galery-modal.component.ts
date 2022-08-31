import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-galery-modal',
	templateUrl: './galery-modal.component.html',
	styleUrls: ['./galery-modal.component.scss'],
})
export class GaleryModalComponent implements OnInit {
	constructor(
		private dialogRef: MatDialogRef<GaleryModalComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			images: string[];
		}
	) {}

	ngOnInit(): void {}

	closeDialog() {
		this.dialogRef.close();
	}
}
