import { Property } from "@/app/types/property";
import ChainBaseClient from "../../client/chainbase/chainbase.client";
import { Attribute, ChainbaseNFTMetadata } from "../../client/chainbase/types/nft.metadata.type";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY as string, "polygon", {
    secretKey: process.env.THIRD_WEB_SECRET_KEY as string,
});

export class NFTService {
    private CHAIN_ID = "137"; // Polygon
    private CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS as string;

    private chainbaseClient = new ChainBaseClient();

    public getPropertyListings = async (limit: number, page: number): Promise<Property[]> => {
        let properties: Property[] = []
        try {
            const nfts = await this.chainbaseClient.getNFTsByContractAddress(this.CHAIN_ID, this.CONTRACT_ADDRESS, page, limit);

            nfts.forEach((element: ChainbaseNFTMetadata) => {
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

    public createListing = async (receiver: string, metadata: any): Promise<string> => {
        const contract = await sdk.getContract(
            this.CONTRACT_ADDRESS
        );

        const payload = {
            to: receiver, // (Required) Who will receive the tokens
            quantity: 1,
            price: 0,
            metadata: metadata
        };

        try {
            const signedPayload = await contract.erc721.signature.generate(payload);

            // Sign transaction on users behalf
            const tx = await contract.erc721.signature.mint(signedPayload);
            const receipt = tx.receipt; // the transaction receipt
            console.log(`receipt: ${receipt}`)

            return tx.id.toNumber().toString(); // the id of the NFT minted
        } catch (error) {
            console.log(error)
        }

        return "";
    };

    public removeListing = async (tokenId: string): Promise<boolean> => {
        const contract = await sdk.getContract(
            this.CONTRACT_ADDRESS
        );

        try {
            const result = await contract.erc721.burn(tokenId);

            // Return true if the burn was successful
            if (result.receipt && result.receipt.status === 1) {
                return true;
            }

        } catch (error) {
            console.log(error);
        }

        return false
    }

    private mapNFTMetadataToProperty = (nft: ChainbaseNFTMetadata): Property => {
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