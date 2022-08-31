import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
	selector: 'app-filters',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
	@Input() gridView: boolean = true;
	@Output() gridViewChange = new EventEmitter<boolean>();
	userRole: number = -1;
	orderSelectedChange: string = '';

	constructor(private loginService: LoginService) {}

	ngOnInit(): void {
		if (localStorage.getItem('userId')) {
			this.loginService
				.getUserById(localStorage.getItem('userId'))
				.subscribe((data) => {
					if (data !== null) this.userRole = data.role;
				});
		}
	}

	setGridView() {
		this.gridView = true;
		this.gridViewChange.emit(this.gridView);
	}
	setListView() {
		this.gridView = false;
		this.gridViewChange.emit(this.gridView);
	}
	isAdmin() {
		if (this.userRole === 1) {
			return true;
		} else return false;
	}
}
