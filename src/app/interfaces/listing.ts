export interface Listing {
    id: number,
    title: string,
    description: string,
    location:string,
    price: number,
    status: 1,
    images: string[],
    category:string
}
//for mock data, needs changes for backend call
