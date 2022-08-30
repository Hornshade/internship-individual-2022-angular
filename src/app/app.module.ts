import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { CardComponent } from './components/card/card.component';
import { CardsComponent } from './pages/cards/cards.component';
import { FavoriteModalComponent } from './components/modal/favorite-modal/favorite-modal.component';
import { DeleteModalComponent } from './components/modal/delete-modal/delete-modal.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ListComponent } from './components/list/list.component';
import { GaleryModalComponent } from './components/modal/galery-modal/galery-modal.component';

import { CarouselComponent } from './components/carousel/carousel.component';
import { ListingService } from './services/listings/listing.service';
import { HomeComponent } from './pages/home/home.component';
import { SingleComponent } from './pages/single/single.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { ResetComponent } from './pages/reset/reset.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { ProfileComponent } from './pages/my-account/profile/profile.component';
import { MessagesComponent } from './pages/my-account/messages/messages.component';
import { NotificationsComponent } from './pages/my-account/notifications/notifications.component';
import { NotificationModalComponent } from './components/modal/notification-modal/notification-modal.component';
import { SecurityComponent } from './pages/my-account/security/security.component';
import { AddComponent } from './pages/add/add.component';
import { PreviewComponent } from './components/modal/preview/preview.component';

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
		ListComponent,
		GaleryModalComponent,
		CarouselComponent,
		HomeComponent,
		SingleComponent,
		FavoritesComponent,
		LoginComponent,
		SignupComponent,
		ForgotComponent,
		ResetComponent,
		MyAccountComponent,
		ProfileComponent,
		MessagesComponent,
		NotificationsComponent,
		NotificationModalComponent,
		SecurityComponent,
  AddComponent,
  PreviewComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		HttpClientModule,
		CarouselModule,
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [ListingService],
	bootstrap: [AppComponent],
})
export class AppModule {}
