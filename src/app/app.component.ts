import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'internship-individual-2022-angular';

	constructor(private route: ActivatedRoute, private router: Router) {}

	ngOnInit(): void {
		//this.checkPage();
	}
	checkPage() {
		if (this.router.url === '/login') {
			return false;
		} else {
			return true;
		}
	}
}
