import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  gridView:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  setGridView() {
    this.gridView = true;
  }
  setListView() {
    this.gridView = false;
  }
}
