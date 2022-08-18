import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-filters',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
	@Input() gridView: boolean = true;
	@Output() gridViewChange = new EventEmitter<boolean>();
	orderSelectedChange: string = '';

	constructor() {}

	ngOnInit(): void {}

	setGridView() {
		this.gridView = true;
		this.gridViewChange.emit(this.gridView);
	}
	setListView() {
		this.gridView = false;
		this.gridViewChange.emit(this.gridView);
	}
}
