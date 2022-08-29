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
	}

	ngOnInit(): void {}

	onSubmit() {
		console.log(this.addForm);
	}

	onChange($event: Event) {
		const file = ($event.target as HTMLInputElement).files
			? ($event.target as HTMLInputElement).files![0]
			: null;
		this.convertToBase64(file);
	}

	convertToBase64(file: File | null) {
		const observable = new Observable((subscriber: Subscriber<any>) => {
			this.readFile(file, subscriber);
		});
		observable.subscribe((data) => {
			console.log(data);
			this.myImage = data;
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
