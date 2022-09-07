import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//firebase
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { getDocs } from 'firebase/firestore';

interface Item {
	name: string;
	customId: string;
	id: string;
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'internship-individual-2022-angular';
	//firebase
	item$!: Observable<Item[]>;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private firestore: Firestore
	) {
		const collectionFire = collection(firestore, 'items');
		this.item$ = collectionData(collectionFire) as Observable<Item[]>;

		console.log(this.item$);
	}

	async ngOnInit() {
		const collectionFire = collection(this.firestore, 'items');
		this.item$ = collectionData(collectionFire) as Observable<Item[]>;
	}
	checkPage(): boolean {
		if (
			this.router.url === '/login' ||
			this.router.url === '/signup' ||
			this.router.url === '/forgot' ||
			this.router.url === '/reset'
		) {
			return false;
		} else {
			return true;
		}
	}
}
