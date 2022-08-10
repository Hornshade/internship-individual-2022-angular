import { Component, OnInit } from '@angular/core';


interface Category {
  value:string;
  viewValue: string;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  categories: Category[] = [
    {value: "latest", viewValue: "Latest"},
    {value: "big-houses", viewValue: "Big Houses"},
    {value: "small-houses", viewValue: "Small Houses"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
