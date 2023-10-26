import { Property } from "./property";

export interface User {
    email: string | null,
    walletAddress: string | null,
    listingBookings: Property[],
    unlistedBookings: Property[]
}