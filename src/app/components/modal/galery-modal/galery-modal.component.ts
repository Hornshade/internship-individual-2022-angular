import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-galery-modal',
  templateUrl: './galery-modal.component.html',
  styleUrls: ['./galery-modal.component.scss']
})
export class GaleryModalComponent implements OnInit {

  images = [
    "https://picsum.photos/640/360",
    "https://picsum.photos/640/360",
    "https://picsum.photos/640/360",
    "https://picsum.photos/640/360",
    "https://picsum.photos/640/360",
    "https://picsum.photos/640/360",
    "https://picsum.photos/640/360",
    "https://picsum.photos/640/360",
    "https://picsum.photos/640/360",
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
