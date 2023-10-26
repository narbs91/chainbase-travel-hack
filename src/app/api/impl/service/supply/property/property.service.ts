import { Property } from "@/app/types/property";
import { IPropertyService } from "./i.property.service";
import { Attribute, ChainbaseNFTMetadataResponse } from "../../../client/chainbase/types/chainbase.nft.metadata.type";

export class PropertyService implements IPropertyService {
    removePropertyListing(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getPropertyListing(id: string): Promise<Property> {
        throw new Error("Method not implemented.");
    }
    getPropertyListings(groupKey: string, limit: number, page: number): Promise<Property[]> {
        throw new Error("Method not implemented.");
    }
    createPropertyListing(property: Property): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    private mapNFTMetadataToProperty = (nft: ChainbaseNFTMetadataResponse): Property => {
        return {
            name: this.findAttribute(nft.metadata, "name"),
            address: this.findAttribute(nft.metadata, "address"),
            checkInDate: this.findAttribute(nft.metadata, "checkInDate"),
            checkoutDate: this.findAttribute(nft.metadata, "checkoutDate"),
            description: this.findAttribute(nft.metadata, "description"),
            price: Number(this.findAttribute(nft.metadata, "price")),
            imageUrl: nft.imageUri,
            id: nft.tokenId,
            lister: nft.owner
        } as Property;
    }

    private findAttribute = (attributes: Attribute[], key: string): string => {
        const attribute = attributes.find(x => x.traitType === key);

        return attribute ? attribute.value : "";
    }
}