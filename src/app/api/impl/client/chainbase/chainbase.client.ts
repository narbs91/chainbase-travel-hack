import { getWithAuth } from "../rest.client";
import { Attribute, ChainbaseNFTMetadataResponse } from "./types/chainbase.nft.metadata.type";

export default class ChainBaseClient {
    private API_KEY = process.env.CHAINBASE_API_KEY as string;

    private AUTH_HEADER_KEY = "x-api-key"

    private BASE_URL = "https://api.chainbase.online/v1"
    private GET_NFT_META_BY_TOKEN_ID_URL = `${this.BASE_URL}/nft/metadata`;
    private GET_BULK_NFT_META = `${this.BASE_URL}/nft/collection/items`;

    public getNFTByTokenId = async (tokenId: string, chainId: string, contractAddress: string): Promise<ChainbaseNFTMetadataResponse> => {
        let nftMetadata = {} as ChainbaseNFTMetadataResponse;

        try {
            const request = `${this.GET_NFT_META_BY_TOKEN_ID_URL}?chain_id=${chainId}&contract_address=${contractAddress}&token_id=${tokenId}`
            const nftResponse = await getWithAuth(request, this.AUTH_HEADER_KEY, this.API_KEY);

            if (nftResponse && nftResponse['data']) {
                nftMetadata = this.mapResponseToNFTMetadata(nftResponse['data']);
            }

        } catch (error) {
            console.log(error)
        }

        return nftMetadata
    }

    public getNFTsByContractAddress = async (chainId: string, contractAddress: string, page: number, limit: number): Promise<ChainbaseNFTMetadataResponse[]> => {
        let nftMetadata: ChainbaseNFTMetadataResponse[] = [];

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

    private mapResponseToNFTMetadata = (response: any): ChainbaseNFTMetadataResponse => {
        let attributes: Attribute[] = [];

        response['metadata']['attributes'].forEach((element: any) => {
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
        } as ChainbaseNFTMetadataResponse;
    }
}