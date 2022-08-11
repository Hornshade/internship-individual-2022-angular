import { Component, Input, OnInit } from '@angular/core';
import {Listing} from "../../listing"

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() listing!: Listing ;
  @Input() favorite:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  setFavorite() {
    this.favorite=!this.favorite
  }

}
