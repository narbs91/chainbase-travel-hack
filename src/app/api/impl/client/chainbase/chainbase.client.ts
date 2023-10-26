import { getWithAuth } from "../rest.client";
import { Attribute, NFTMetadata } from "./types/nft.metadata.type";

export default class ChainBaseClient {
    private API_KEY = process.env.CHAINBASE_API_KEY as string;
    private BASE_URL = "https://api.chainbase.online/v1"
    private GET_NFT_META_BY_TOKEN_ID_URL = `${this.BASE_URL}/nft/metadata`;
    private GET_BULK_NFT_META = `${this.BASE_URL}/nft/collection/items`;
    private AUTH_HEADER_KEY = "x-api-key"

    public getNFTByTokenId = async (tokenId: string, chainId: string, contractAddress: string): Promise<NFTMetadata> => {
        let nftMetadata = {} as NFTMetadata;

        try {
            const request = `${this.GET_NFT_META_BY_TOKEN_ID_URL}?chain_id=${chainId}&contract_address=${contractAddress}&token_id=${tokenId}`
            const nftResponse = await getWithAuth(request, this.AUTH_HEADER_KEY, this.API_KEY);

            nftMetadata = this.mapResponseToNFTMetadata(nftResponse);
        } catch (error) {
            console.log(error)
        }

        return nftMetadata
    }

    public getNFTsByContractAddress = async (chainId: string, contractAddress: string, page: number, limit: number): Promise<NFTMetadata[]> => {
        let nftMetadata: NFTMetadata[] = [];

        try {
            const request = `${this.GET_BULK_NFT_META}?chain_id=${chainId}&contract_address=${contractAddress}`
            const nftResponse = await getWithAuth(request, this.AUTH_HEADER_KEY, this.API_KEY);

            nftResponse['data'].forEach((element: any) => {
                const nftMeta = this.mapResponseToNFTMetadata(element)

                nftMetadata.push(nftMeta);
            })

        } catch (error) {
            console.log(error)
        }

        return nftMetadata
    }

    private mapResponseToNFTMetadata = (response: any): NFTMetadata => {
        let attributes: Attribute[] = [];

        response.metadata.forEach((element: any) => {
            const attribute = {
                traitType: element['trait_type'],
                value: element['value']
            } as Attribute

            attributes.push(attribute);
        })

        return {
            tokenId: response['token_id'],
            owner: response['owner'],
            metadata: attributes,
            imageUri: response['image_uri']
        } as NFTMetadata;
    }
}