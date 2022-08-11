import { Component, Input, OnInit } from '@angular/core';


interface Options {
  value:string;
  viewValue: string;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() options:string ="categories"


  categories: Options[] = [
    {value: "latest", viewValue: "Latest"},
    {value: "big-houses", viewValue: "Big Houses"},
    {value: "small-houses", viewValue: "Small Houses"},
  ]
  locations: Options[] = [
    {value: "suceava", viewValue: "Suceava"},
    {value: "iasi", viewValue: "Iasi"},
    {value: "cluj", viewValue: "Cluj"}
  ]
  prices: Options[] = [
    {value: "0-10000", viewValue: "0 - 10.000"},
    {value: "10000-50000", viewValue: "10.000 - 50.000"},
    {value: "50000-100000", viewValue: "50.000 - 100.000"}
  ]
  orders: Options[] = [
    {value: "", viewValue: "Most popular"},
    {value: "low_to_high", viewValue: "Price: Low to High"},
    {value: "high_to_low", viewValue: "Price: High to Low"}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
