import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Divider,
} from "@chakra-ui/react";
import styles from "./page.module.css";
import { getMarketplaceContract } from "@/app/contracts";
import { DirectListingV3, NFTMetadata, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Suspense } from "react";
import Loading from "./loading";

function mapToMarketListing(listings: Array<DirectListingV3>): Array<Listing> {
  //TODO: Map each direct listing to simple listings for UI

  //temp
  return [
    {
      heading: "The Riz",
      price: 12.0,
      shortDescription: "Stuff",
      //TODO: Calculate time left until booking expires?
      timeExpire: new Date("2/1/24"),
      //TODO: Get currency data
      currency: "$",
    },
  ];
}

async function getData() {
  const contract = await getMarketplaceContract();

  //TODO
  const listings: Array<DirectListingV3> =
    await contract.directListings.getAll();

  const data = mapToMarketListing(listings);

  return data;
}

async function renderCards() {
  try {
    const listings = await getData();
    return listings.map((listing) => {
      return (
        <Card key={"temp"}>
          <CardHeader>
            <Heading size="md"> {listing.heading} </Heading>
          </CardHeader>
          <CardBody>
            <Stack>
              <Text> {listing.shortDescription} </Text>
              <Text color="green" fontSize="2xl">
                {`${listing.currency} ${listing.price.toString()}`}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Button>Buy</Button>
          </CardFooter>
        </Card>
      );
    });
  } catch (e) {
    return <Text>No Listings Yet</Text>;
  }
}

export default async function Listings() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {await renderCards()}
        </SimpleGrid>
      </div>
    </main>
  );
}
