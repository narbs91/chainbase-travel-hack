import { NFTMetadata } from "@thirdweb-dev/sdk"
import { NFTData } from "./model/nft.data"

export interface INFTService {
    mint(toAddress: string, metadata: NFTMetadata) : Promise<string>
    burn(tokenId: string) : Promise<boolean>
    getNFTMetaData(tokenId: string, contractAddress: string) : Promise<NFTData>
    getMFTMetaDataForCollection(contractAddress: string, limit : number, page: number) : Promise<NFTData[]>
    purchase(tokenId: string, price: string, purchaserAddress: string, receiverAddress: string) : Promise<boolean>
}