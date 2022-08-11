import { Component, Input, OnInit } from '@angular/core';
import {Listing} from "../../listing";
import {MatDialog} from '@angular/material/dialog';
import { FavoriteModalComponent } from '../modal/favorite-modal/favorite-modal.component';
import { DeleteModalComponent } from '../modal/delete-modal/delete-modal.component';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() listing!: Listing ;
  @Input() favorite:boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(FavoriteModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  setFavorite() {
    // if no user this.openDialog() 
    this.favorite=!this.favorite;
  }

}
