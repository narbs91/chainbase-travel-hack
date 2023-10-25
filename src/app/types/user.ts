export interface User {
    email: string | null,
    walletAddress: string | null,
    listings: Listing[]
}

export interface Listing {
    name: string,
    address: string,
    price: number,
    checkoutDate: string,
    checkInDate: string,
    imageUrl: string
}