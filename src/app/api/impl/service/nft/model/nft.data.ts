export interface NFTData {
    name: string,
    tokenId: string,
    owner: string,
    image: string,
    attributes: NFTDataAttribute[]
}

export interface NFTDataAttribute {
    trait_type: string;
    value: string;
}