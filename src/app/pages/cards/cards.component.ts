import { Component, OnInit } from '@angular/core';
import { Listing } from '../../interfaces/listing';
import { LISTINGS } from '../../mock-listings';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  listings: Listing[] = LISTINGS;
  gridView:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
