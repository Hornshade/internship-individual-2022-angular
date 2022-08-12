import { Component, Input, OnInit } from '@angular/core';
import {Options} from "../../interfaces/options";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() options:string ="categories"
  
  // Categories options for filtering the header dropdown
  categories: Options[] = [
    {value: "latest", viewValue: "Latest"},
    {value: "big", viewValue: "Big Houses"},
    {value: "small", viewValue: "Small Houses"},
  ]
  // location options for filtering the category page
  locations: Options[] = [
    {value: "suceava", viewValue: "Suceava"},
    {value: "iasi", viewValue: "Iasi"},
    {value: "cluj", viewValue: "Cluj"}
  ]
  // prices options for filtering the category page 
  prices: Options[] = [
    {value: "0 - 10000", viewValue: "0 - 10.000"},
    {value: "10000 - 50000", viewValue: "10.000 - 50.000"},
    {value: "50000 - 100000", viewValue: "50.000 - 100.000"},
    {value: "100000 - 300000", viewValue: "100.000 - 300.000"},
    {value: "300000 - 700000", viewValue: "300.000 - 700.000"},
    {value: "700000 - 1000000", viewValue: "700.000 - 1.000.000"},
  ]
  // Order By options for filtering the category page 
  orders: Options[] = [
    {value: "Popular", viewValue: "Most popular"},
    {value: "LowToHigh", viewValue: "Price: Low to High"},
    {value: "HighToLow", viewValue: "Price: High to Low"},
    {value: "Featured", viewValue: "Featured"},
  ]
  // Set default option of Order By to most popular
  selectedOrder :string = this.orders[0].value;

  
  constructor() { }

  ngOnInit(): void {
    
  }

}
