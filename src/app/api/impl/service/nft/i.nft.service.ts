import { NFTMetadata } from "@thirdweb-dev/sdk"


export interface INFTService {
    mint(toAddress: string, metadata: NFTMetadata) : Promise<string>
    burn(tokenId: string) : Promise<boolean>
    getNFTMetaData(tokenId: string, contractAddress: string) : Promise<NFTMetadata>
    getMFTMetaDataForCollection(contractAddress: string, limit : number, page: number) : Promise<NFTMetadata[]>
    purchase(tokenId: string, price: string, purchaserAddress: string, receiverAddress: string) : Promise<boolean>
}