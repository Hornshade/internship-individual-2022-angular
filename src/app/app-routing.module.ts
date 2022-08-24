import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './pages/cards/cards.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ResetComponent } from './pages/reset/reset.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SingleComponent } from './pages/single/single.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, title: 'Home page' },
	{ path: 'category/:categ', component: CardsComponent, title: 'Category' },
	{ path: 'listing/:id', component: SingleComponent, title: 'Single page' },
	{
		path: 'favorite/:userId',
		component: FavoritesComponent,
		title: 'Favorites page',
	},
	{ path: 'login', component: LoginComponent, title: 'Login Page' },
	{ path: 'signup', component: SignupComponent, title: 'Signup Page' },
	{ path: 'forgot', component: ForgotComponent, title: 'Forgot page' },
	{ path: 'reset', component: ResetComponent, title: 'Reset page' },
	{ path: '', redirectTo: '', pathMatch: 'full', component: HomeComponent },
	{ path: '**', redirectTo: '' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
