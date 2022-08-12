import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './components/header/header.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { CardComponent } from './components/card/card.component';
import { CardsComponent } from './pages/cards/cards.component';
import { FavoriteModalComponent } from './components/modal/favorite-modal/favorite-modal.component';
import { DeleteModalComponent } from './components/modal/delete-modal/delete-modal.component';
import { FiltersComponent } from './components/filters/filters.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownComponent,
    CardComponent,
    CardsComponent,
    FavoriteModalComponent,
    DeleteModalComponent,
    FiltersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
