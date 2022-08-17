import { Component, Input, OnInit } from '@angular/core';
import { Listing } from '../../interfaces/listing';
import { PageEvent } from '@angular/material/paginator';
import { ListingService } from "../../services/listings/listing.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  listings: Listing[] =[] ;
  gridView:boolean = true;
  category: string | null ="Category";
  @Input() categorySelected = '';
  pageSlice=this.listings.slice(0.4);
  selectedCategory!:string | null;
  selectedLocation!:string[];
  selectedPrice!:string;
  selectedOrder!:string;
  urlCategory!: string;

  //have to change route later to /category
  constructor(private listingsService: ListingService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listingsService.currentCategory.subscribe(selectedCategory => {
      this.selectedCategory=selectedCategory
      if(selectedCategory === 'big'){
        this.category="Big Houses"
      }else if ( selectedCategory === 'small'){
        this.category="Small Houses"
      }else {
        this.category="Latest"
      }
    })
    this.listingsService.currentLocation.subscribe(selectedLocation => this.selectedLocation=selectedLocation)
    this.listingsService.currentPrice.subscribe(selectedPrice => this.selectedPrice=selectedPrice)
    this.listingsService.currentOrder.subscribe(selectedOrder => this.selectedOrder=selectedOrder)
    this.listingsService.currentListing.subscribe(listing => {
      this.listings=listing
      this.pageSlice = this.listings.slice(0,4)
    })
    
  };
  
  onPageChange(event: PageEvent) {
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if( endIndex > this.listings.length) {
      endIndex=this.listings.length;
    }
    this.pageSlice = this.listings.slice(startIndex,endIndex);
  }
}
