import ChainBaseClient from "../../client/chainbase/chainbase.client";
import { Attribute, ChainbaseNFTMetadataResponse } from "../../client/chainbase/types/chainbase.nft.metadata.type";
import { NFT, NFTMetadata, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { INFTService } from "./i.nft.service";
import {BaseGoerli, Polygon} from '@thirdweb-dev/chains';

//TODO: change depending on env
const selectedChain = BaseGoerli

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

    async getNFTMetaData(tokenId: string, contractAddress: string): Promise<NFTMetadata> {
        let metadata = {} as NFTMetadata;
        let nft;
        try {
            nft = await this.chainbaseClient.getNFTByTokenId(tokenId, this.CHAIN_ID, contractAddress);

            if (nft) {
                metadata = this.mapChainbaseNFTMetadataToProperty(nft);
            } 
        } catch (error) {
            console.log(error)
        }

        try {
            //fallback to thirdweb if chainbase doesn't have the data in real time
            if (!nft) {
                const contract = await sdk.getContract(
                    contractAddress
                );

                metadata = (await contract.erc721.get(tokenId)).metadata;
            }
        } catch (error) {
            console.log(error)
        }

        return metadata;
    }

    async getMFTMetaDataForCollection(contractAddress: string, limit: number, page: number): Promise<NFTMetadata[]>  {
        let metadata: NFTMetadata[] = []
        let nfts = []
        try {
            nfts = await this.chainbaseClient.getNFTsByContractAddress(this.CHAIN_ID, contractAddress, page, limit);

            if (nfts.length !== 0) {
                nfts.forEach((element: ChainbaseNFTMetadataResponse) => {
                    const property = this.mapChainbaseNFTMetadataToProperty(element);

                    metadata.push(property);
                })
            }
        } catch (error) {
            console.log(error)
        }

        try {
            //fallback to thirdweb if chainbase doesn't have the data in real time
            if (nfts.length === 0) {
                const contract = await sdk.getContract(
                    contractAddress
                );

                const queryParams = {
                    count: limit,
                    start: page === 1 ? 0 : limit + (page - 1),
                };
                const num = await contract.erc721.totalCount()
                
                if (num.toNumber() > 0) {
                    const thirdWebNFTResponse = await contract.erc721.getAll();
                    thirdWebNFTResponse.forEach((element) => {
                    metadata.push(element.metadata);
                })
                }
                
            }
        } catch (error) {
            console.log(error)
        }

        return metadata;
    }

    purchase(tokenId: string, price: string, purchaserAddress: string, receiverAddress: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    private mapChainbaseNFTMetadataToProperty = (chainbaseNFTResponse: ChainbaseNFTMetadataResponse): NFTMetadata => {

        let attributes: any[] = [];

        chainbaseNFTResponse.metadata.forEach((element: Attribute) => {
            const attribute = {
                trait_type: element.traitType,
                value: element.value
            }

            attributes.push(attribute);
        })

        return {
            id: chainbaseNFTResponse.tokenId,
            image: chainbaseNFTResponse.imageUri,
            attributes: attributes
        } as NFTMetadata;
    }
}