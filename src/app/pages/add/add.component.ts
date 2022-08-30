import { Component, OnInit } from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { PreviewComponent } from 'src/app/components/modal/preview/preview.component';
import { ListingService } from 'src/app/services/listings/listing.service';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
	// addForm: FormGroup | any;
	myImage: any;
	numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	myImages!: any[];
	urlId!: string | null;
	showEdit: boolean = false;

	addForm = this.fb.group({
		title: [
			'',
			[Validators.required, Validators.minLength(4), Validators.maxLength(50)],
		],
		category: ['', [Validators.required]],
		price: [
			0,
			[Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)],
		],
		photos: this.fb.array<string>(
			[],
			[Validators.required, Validators.minLength(5)]
		),
		description: ['', [Validators.required, Validators.minLength(100)]],
		location: [
			'',
			[Validators.required, Validators.minLength(2), Validators.maxLength(100)],
		],
		phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
	});

	get photos() {
		return this.addForm.controls['photos'] as FormArray;
	}

	constructor(
		private route: ActivatedRoute,
		private listingService: ListingService,
		private fb: FormBuilder,
		public dialog: MatDialog
	) {
		if (this.route.snapshot.paramMap.get('id')) {
			this.showEdit = true;
			this.urlId = this.route.snapshot.paramMap.get('id');
			this.listingService.getListingById(this.urlId).subscribe((result) => {
				this.addForm.controls.title.setValue(result.title);
				this.addForm.controls.category.setValue(result.category);
				this.addForm.controls.price.setValue(result.price);
				if (result.location.length > 2) {
					this.addForm.controls.location.setValue(result.location[2]);
				} else {
					this.addForm.controls.location.setValue(result.location[0]);
				}
				this.addForm.controls.description.setValue(result.description);
				if (result.images.length > 0) {
					result.images.map((img) => {
						this.photos.push(this.fb.control(img));
					});
					this.myImages = result.images.map((x) => x);
				}
			});
		}
		this.myImages = ['', '', '', '', '', '', '', '', ''];
	}

	ngOnInit(): void {}

	onSubmit() {
		if (this.addForm.valid)
			this.listingService
				.addListing(
					this.addForm.controls.title.value!,
					this.addForm.controls.description.value!,
					this.addForm.controls.location.value!,
					this.addForm.controls.price.value!,
					this.addForm.controls.photos.value,
					this.addForm.controls.category.value!,
					localStorage.getItem('userId')
				)
				.subscribe();
		console.log(this.addForm);
	}

	onChange(e: any, i: number) {
		const file = (e.target as HTMLInputElement).files
			? (e.target as HTMLInputElement).files![0]
			: null;

		this.convertToBase64(file, i);
	}

	convertToBase64(file: File | null, i: number) {
		const observable = new Observable((subscriber: Subscriber<any>) => {
			this.readFile(file, subscriber);
		});
		observable.subscribe((data) => {
			this.myImages[i] = data;
			this.photos.push(this.fb.control(data));
			console.log(this.photos.value);
			console.log(this.addForm.controls.title.value);
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

	openDialog() {
		const dialogRef = this.dialog.open(PreviewComponent, {
			height: '100%',
			width: '100%',
			data: {
				title: this.addForm.controls.title.value,
				price: this.addForm.controls.price.value,
				description: this.addForm.controls.description.value,
				location: this.addForm.controls.location.value,
				images: this.addForm.controls.photos.value,
				author: localStorage.getItem('userId'),
				editShow: this.showEdit,
			},
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log(`Dialog result: ${result}`);
		});
	}
}
