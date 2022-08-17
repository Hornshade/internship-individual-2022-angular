import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListingService } from '../../services/listings/listing.service';
import {Options} from "../../interfaces/options";
import { Listing } from '../../interfaces/listing';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() options:string ="categories";

  selectedCategory!:string | null;
  selectedLocation!:string[];
  selectedPrice!:string;
  selectedOrder!:string;
  listing!:Listing[];
  
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
    {value: "cluj", viewValue: "Cluj"},
    {value: "sydney", viewValue: "Sydney"},
    {value: "timișoara", viewValue: "Timisoara"},
  ]
  // prices options for filtering the category page 
  prices: Options[] = [
    {value: "", viewValue: "All"},
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
  @Input() orderSelected = "";

  urlCategory:string | null = "";
  
  constructor(private listingsService: ListingService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.urlCategory = this.route.snapshot.paramMap.get('categ');
    this.listingsService.changeCategory(this.urlCategory);
    this.listingsService.currentCategory.subscribe(selectedCategory => this.selectedCategory=selectedCategory)
    this.listingsService.currentLocation.subscribe(selectedLocation => this.selectedLocation=selectedLocation)
    this.listingsService.currentPrice.subscribe(selectedPrice => this.selectedPrice=selectedPrice)
    this.listingsService.currentOrder.subscribe(selectedOrder => this.selectedOrder=selectedOrder)
    this.listingsService.currentListing.subscribe(listing => this.listing=listing)
    this.listingsService.getListingsSort(this.selectedCategory,this.selectedLocation,this.selectedPrice,this.selectedOrder)
      .subscribe(data => {
        this.listing= data
        this.listingsService.changeListing(data);
      })
  }

  onCategoryChange(value: string) {
    this.listingsService.changeCategory(value);
    this.listingsService.getListingsSort(value,this.selectedLocation,this.selectedPrice,this.selectedOrder)
      .subscribe(data => {
        this.listing= data
        this.listingsService.changeListing(data);
      });
  }
  onLocationChange(value:any) {
    this.listingsService.changeLocation(value)
    this.listingsService.getListingsSort(this.selectedCategory,value,this.selectedPrice,this.selectedOrder)
      .subscribe(data => {
        this.listing= data
        this.listingsService.changeListing(data);
      });
  }
  onPriceChange(value:any) {
    this.listingsService.changePrice(value)
    this.listingsService.getListingsSort(this.selectedCategory,this.selectedLocation,value,this.selectedOrder)
      .subscribe(data => {
        this.listing= data
        this.listingsService.changeListing(data);
      });

  }
  onOrderChange(value:any) {
    this.listingsService.changeOrder(value)
    this.listingsService.getListingsSort(this.selectedCategory,this.selectedLocation,this.selectedPrice,value)
    .subscribe(data => {
      this.listing= data
      this.listingsService.changeListing(data);
    });
  }
}
