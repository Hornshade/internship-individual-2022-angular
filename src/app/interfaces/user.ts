import { Listing } from './listing';

export interface User {
	id: string;
	fullName: string;
	email: string;
	password: string;
	gender: number;
	phone: string;
	role: number;
	dateOfBirth: string;
	address: string;
	photo: string;
	userActivities: UserActivities;
	token: string;
	createdAt: string;
	updatedAt: string;
	isActive: boolean;
	google: boolean;
	listings: Listing[];
}

export interface UserActivities {
	id: string;
	device: string;
	deviceType: string;
	location: string;
	connectionDate: string;
	status: number;
}
