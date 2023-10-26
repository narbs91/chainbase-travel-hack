export interface NFTMetadata {
    tokenId: string,
    metadata: Attribute[],
    imageUri: string,
    owner: string
}

export interface Attribute {
    traitType: string,
    value: string
}