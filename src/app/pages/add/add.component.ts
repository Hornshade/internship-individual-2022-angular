import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { ListingService } from 'src/app/services/listings/listing.service';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
	addForm: FormGroup | any;
	myImage: any;
	numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	myImages!: any[];
	constructor(private listingService: ListingService) {
		this.addForm = new FormGroup({
			title: new FormControl('', [
				Validators.required,
				Validators.minLength(4),
			]),
			category: new FormControl('', [Validators.required]),
			price: new FormControl('', [
				Validators.required,
				Validators.pattern('^[0-9]*$'),
			]),
			photos: new FormControl(['']),
			description: new FormControl('', [
				Validators.required,
				Validators.minLength(100),
			]),
			location: new FormControl('', [
				Validators.required,
				Validators.minLength(2),
			]),
			phone: new FormControl('', [
				Validators.required,
				Validators.pattern('^[0-9]*$'),
			]),
		});
		this.myImages = ['', '', '', '', '', '', '', '', ''];
	}

	ngOnInit(): void {}

	onSubmit() {
		console.log(this.addForm);
	}

	onChange(e: any, i: number) {
		const file = (e.target as HTMLInputElement).files
			? (e.target as HTMLInputElement).files![0]
			: null;
		console.log(file);

		this.convertToBase64(file, i);
	}

	convertToBase64(file: File | null, i: number) {
		const observable = new Observable((subscriber: Subscriber<any>) => {
			this.readFile(file, subscriber);
		});
		observable.subscribe((data) => {
			this.myImages[i] = data;
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
