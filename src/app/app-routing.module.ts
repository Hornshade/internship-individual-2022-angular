import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './pages/cards/cards.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path:"", component: HomeComponent, title:"Home page"},
  {path:"category/:categ", component: CardsComponent , title:"Category"},
  {path:"listing/:id", component: CardsComponent, title:"Single page"},
  {path:"**", redirectTo: ""},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
