import { ThirdwebSDK } from "@thirdweb-dev/sdk";

async function getMarketplaceContract(){
    const sdk = new ThirdwebSDK("base-goerli", {
        secretKey: "38QxL6tilroEJWwWYCThSlQ1RPbAOBqgLITFd5SK0KXATFtSOd85iO1KSFJzH_UySKWusG9pXlkBF3UFSw388g",
      });
      
    return await sdk.getContract("0xCb5d26BBA9eBaaBc429e801369acFcb37Ad50fe0");
}

export {getMarketplaceContract}