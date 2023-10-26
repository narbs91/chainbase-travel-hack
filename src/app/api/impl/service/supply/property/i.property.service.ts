import { Property } from "@/app/types/property";

export interface IPropertyService {
    getPropertyListing(id: string) : Promise<Property>
    getPropertyListings(groupKey: string, limit: number, page: number) : Promise<Property[]>
    createPropertyListing(property: Property) : Promise<boolean>
    removePropertyListing(id: string) : Promise<boolean>
}