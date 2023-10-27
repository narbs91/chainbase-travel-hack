import { Property } from "@/app/types/property";

export interface IPropertyService {
    getPropertyListing(propertyTokenId: string) : Promise<Property>
    getPropertyListings(limit: number, page: number) : Promise<Property[]>
    getUserListingsForDashboard(userWalletAddress: string): Promise<Property[]>
    createPropertyListing(property: Property) : Promise<boolean>
    removePropertyListing(id: string) : Promise<boolean>
}