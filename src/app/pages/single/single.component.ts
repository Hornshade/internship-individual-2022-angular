import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Listing } from '../../interfaces/listing';
import { ListingService } from 'src/app/services/listings/listing.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {
  listing!: Listing[];
  urlId!:string | null

  constructor(private route: ActivatedRoute, private listingsService: ListingService) { }

  ngOnInit(): void {
    this.urlId=this.route.snapshot.paramMap.get('id')
    this.listingsService.getListingById(this.urlId)
      .subscribe(data => this.listing = data)
  }

}
