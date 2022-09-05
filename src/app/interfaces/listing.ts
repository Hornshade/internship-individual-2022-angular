export interface Listing {
	id: string;
	title: string;
	description: string;
	shortDescription: string;
	location: string[];
	price: number;
	status: number;
	images: string[];
	category: string;
	author: {
		id: string;
		photo: string;
		fullName: string;
		createdAt: string;
	};
	viewCounter: number;
	createdAt: string;
	updatedAt: string;
}
