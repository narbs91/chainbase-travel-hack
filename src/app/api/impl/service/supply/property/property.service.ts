import { Property } from "@/app/types/property";
import { IPropertyService } from "./i.property.service";
import { NFTMetadata } from "@thirdweb-dev/sdk";
import { RedisCacheService } from "../../cache/redis/redis.cache.service";
import { NFTService } from "../../nft/nft.service";
import { NFTData } from "../../nft/model/nft.data";

export class PropertyService implements IPropertyService {
    private TRAVEL_SMART_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS as string;

    private cacheService = new RedisCacheService();
    private nftService = new NFTService();

    async removePropertyListing(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async getPropertyListing(propertyTokenId: string): Promise<Property> {
        let listing = {} as Property;

        try {
            const nftResponse = await this.nftService.getNFTMetaData(propertyTokenId, this.TRAVEL_SMART_CONTRACT_ADDRESS)
            listing = this.mapNFTMetadataToProperty(nftResponse);
        } catch (error) {
            console.log(error)
        }

        return listing;
    }
    

    async getPropertyListings(limit: number, page: number): Promise<Property[]> {
        let listings: Property[] = [];

        try {
            const nftsFromResponse = await this.nftService.getMFTMetaDataForCollection(this.TRAVEL_SMART_CONTRACT_ADDRESS, limit, page);

            nftsFromResponse.forEach(nft => {
                const listing = this.mapNFTMetadataToProperty(nft);

                listings.push(listing)
            })
        } catch (error) {
            console.log(error);
        }

        return listings;
    }

    async createPropertyListing(property: Property): Promise<boolean> {

        try {
            const listerWalletAddress = property.lister;
            const metadata = {
                name: property.name,
                description: property.description,
                image: property.imageUrl,
                attributes: [
                    { trait_type: "name", value: property.name },
                    { trait_type: "address", value: property.address },
                    { trait_type: "checkInDate", value: property.checkInDate },
                    { trait_type: "checkoutDate", value: property.checkoutDate },
                    { trait_type: "description", value: property.description },
                    { trait_type: "price", value: property.price },
                    { trait_type: "currency", value: property.currency }
                ] as any
            } as NFTMetadata

            const tokenId = await this.nftService.mint(listerWalletAddress, metadata);

            if (tokenId && tokenId !== "") {
                const cacheKey = `${property.lister}:listings`;
                await this.upkeepCache(cacheKey, property, tokenId);

                return true;
            }
        } catch (error) {
            console.log(error);
        }

        return false
    }

    async getUserListingsForDashboard(userWalletAddress: string): Promise<Property[]> {
        let listings: Property[] = [];

        try {
            const cacheKey = `${userWalletAddress}:listings`;
            const cacheResponse = await this.cacheService.get(cacheKey) as any;

            if (cacheResponse !== null) {
                for (const item in cacheResponse) {
                    listings.push(JSON.parse(item))
                }
            }

        } catch (error) {
            console.log(error)
        }
        return listings;
    }

    private upkeepCache = async (key: string, property: Property, tokenId: string) => {
        const updatedProperty = property;
        updatedProperty.listed = true;
        updatedProperty.id = tokenId;

        await this.cacheService.appendToSet(key, JSON.stringify(updatedProperty));
    }

    private mapNFTMetadataToProperty = (nft: NFTData): Property => {
        let property = {} as Property;

        if (nft && nft.attributes) {
            const attributesArray = nft.attributes as any[];
            return {
                name: this.findAttribute(attributesArray, "name"),
                address: this.findAttribute(attributesArray, "address"),
                checkInDate: this.findAttribute(attributesArray, "checkInDate"),
                checkoutDate: this.findAttribute(attributesArray, "checkoutDate"),
                description: this.findAttribute(attributesArray, "description"),
                price: Number(this.findAttribute(attributesArray, "price")),
                currency: this.findAttribute(attributesArray, "currency"),
                imageUrl: nft.image,
                id: nft.tokenId,
                lister: nft.owner,
                listed: true

            } as Property;
        }

        return property
    }

    private findAttribute = (attributes: any[], key: string): string => {
        const attribute = attributes.find(x => x.trait_type === key);

        return attribute ? attribute.value : "";
    }
}