import ChainBaseClient from "../../client/chainbase/chainbase.client";
import { Attribute, ChainbaseNFTMetadataResponse } from "../../client/chainbase/types/chainbase.nft.metadata.type";
import { NFT, NFTMetadata, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { INFTService } from "./i.nft.service";
import { NFTData } from "./model/nft.data";
import { Polygon, BaseGoerli } from '@thirdweb-dev/chains';


//TODO: change depending on env
const selectedChain = Polygon

const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY as string, selectedChain, {
    secretKey: process.env.THIRD_WEB_SECRET_KEY as string,
});

export class NFTService implements INFTService {
    private CHAIN_ID = selectedChain.chainId.toString(); // Polygon
    private TRAVEL_SMART_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS as string;

    private chainbaseClient = new ChainBaseClient();

    async mint(toAddress: string, metadata: NFTMetadata): Promise<string> {
        const contract = await sdk.getContract(
            this.TRAVEL_SMART_CONTRACT_ADDRESS
        );

        const payload = {
            to: toAddress, // (Required) Who will receive the tokens
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
    }

    async burn(tokenId: string): Promise<boolean> {
        const contract = await sdk.getContract(
            this.TRAVEL_SMART_CONTRACT_ADDRESS
        );

        try {
            const result = await contract.erc721.burn(Number(tokenId));

            // Return true if the burn was successful
            if (result.receipt && result.receipt.status === 1) {
                return true;
            }

        } catch (error) {
            console.log(error);
        }

        return false
    }

    async getNFTMetaData(tokenId: string, contractAddress: string): Promise<NFTData> {
        let nftData = {} as NFTData;

        try {
            const nft = await this.chainbaseClient.getNFTByTokenId(tokenId, this.CHAIN_ID, contractAddress);

            //fallback to thirdweb if chainbase doesn't have the data in real time
            if (!nft) {
                nftData = this.mapChainbaseNFTMetadataToNFTData(nft);

                if (!nftData.owner) {
                    const owner = await this.chainbaseClient.getNFTOwnerByTokenId(this.CHAIN_ID, contractAddress, tokenId);
                    nftData.owner = owner;
                }
            } else {
                //fallback to thirdweb if chainbase doesn't have the data in real time
                const contract = await sdk.getContract(
                    contractAddress
                );

                const thirdWebResponse = await contract.erc721.get(tokenId);
                nftData = this.mapNFTMetadataToNFTData(thirdWebResponse);
            }
        } catch (error) {
            console.log(error)
        }

        return nftData;
    }


    async getMFTMetaDataForCollection(contractAddress: string, limit: number, page: number): Promise<NFTData[]> {
        let nftData: NFTData[] = [];

        try {
            const contract = await sdk.getContract(
                contractAddress
            );

            const queryParams = {
                count: limit,
                start: page === 1 ? 0 : limit + (page - 1),
            };

            const thirdWebNFTResponse = await contract.erc721.getAll(queryParams);
            thirdWebNFTResponse.forEach((element) => {
                const data = this.mapNFTMetadataToNFTData(element);
                nftData.push(data);
            })
        } catch (error) {
            console.log(error)
        }

        return nftData;
    }

    purchase(tokenId: string, price: string, purchaserAddress: string, receiverAddress: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    private mapChainbaseNFTMetadataToNFTData = (chainbaseNFTResponse: ChainbaseNFTMetadataResponse): NFTData => {

        let attributes: any[] = [];

        chainbaseNFTResponse.metadata.forEach((element: Attribute) => {
            const attribute = {
                trait_type: element.traitType,
                value: element.value
            }

            attributes.push(attribute);
        })

        return {
            name: chainbaseNFTResponse.name,
            owner: chainbaseNFTResponse.owner,
            tokenId: chainbaseNFTResponse.tokenId,
            image: chainbaseNFTResponse.imageUri,
            attributes: attributes
        } as NFTData;
    }

    private mapNFTMetadataToNFTData = (nft: NFT): NFTData => {

        const attributesFromNFT = nft.metadata.attributes as any[];

        const attributes = [
            { trait_type: "name", value: this.findAttribute(attributesFromNFT, "name") },
            { trait_type: "address", value: this.findAttribute(attributesFromNFT, "address") },
            { trait_type: "checkInDate", value: this.findAttribute(attributesFromNFT, "checkInDate") },
            { trait_type: "checkoutDate", value: this.findAttribute(attributesFromNFT, "checkoutDate") },
            { trait_type: "description", value: this.findAttribute(attributesFromNFT, "description") },
            { trait_type: "price", value: this.findAttribute(attributesFromNFT, "price") },
            { trait_type: "currency", value: this.findAttribute(attributesFromNFT, "currency") }
        ];

        return {
            name: nft.metadata.name,
            owner: nft.owner,
            tokenId: nft.metadata.id,
            image: nft.metadata.image,
            attributes: attributes
        } as NFTData;
    }

    private findAttribute = (attributes: any[], key: string): string => {
        const attribute = attributes.find(x => x.trait_type === key);

        return attribute ? attribute.value : "";
    }
}