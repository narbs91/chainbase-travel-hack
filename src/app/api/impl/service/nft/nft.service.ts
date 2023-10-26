import { Property } from "@/app/types/property";
import ChainBaseClient from "../../client/chainbase/chainbase.client";
import { Attribute, NFTMetadata } from "../../client/chainbase/types/nft.metadata.type";

export class NFTService {
    private CHAIN_ID = "137"; // Polygon
    private CONTRACT_ADDRESS = "0x207c934794a05f99B89BC7E000029A6c854aB335";

    private chainbaseClient = new ChainBaseClient();

    public getPropertyListings = async (limit: number, page: number): Promise<Property[]> => {
        let properties: Property[] = []
        try {
            const nfts = await this.chainbaseClient.getNFTsByContractAddress(this.CHAIN_ID, this.CONTRACT_ADDRESS, page, limit);

            nfts.forEach((element: NFTMetadata) => {
                const property = this.mapNFTMetadataToProperty(element);

                properties.push(property);
            })
        } catch (error) {
            console.log(error)
        }

        return properties;
    }

    public getPropertyListing = async (id: string): Promise<Property> => {
        let property = {} as Property;

        try {
            const nft = await this.chainbaseClient.getNFTByTokenId(id, this.CHAIN_ID, this.CONTRACT_ADDRESS);
            property = this.mapNFTMetadataToProperty(nft);

        } catch (error) {
            console.log(error)
        }

        return property;
    }

    private mapNFTMetadataToProperty = (nft: NFTMetadata): Property => {
        //TODO might have to revise after you do the NFT creation
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