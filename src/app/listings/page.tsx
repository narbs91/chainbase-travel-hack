import {
  Text,
  SimpleGrid,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { PropertyService } from "../api/impl/service/supply/property/property.service";
import SearchResultCard from "./search/search-result-card";
import DataLoadErrorComponent from "./search/data-not-loaded";

async function getData() {
  const propertyService = new PropertyService();
  const listing = await propertyService.getPropertyListings(20, 1);

  return listing;
}

async function renderCards() {
  try {
    const listings = await getData();
    return listings.map((listing) => {
      return (
        <SearchResultCard
          key={listing.id}
          name={listing.name}
          price={listing.price}
          imageUrl={listing.imageUrl}
          checkInDate={listing.checkInDate}
          checkoutDate={listing.checkoutDate}
          description={listing.description}
        />
      );
    });
  } catch (e) {
    return (
      <Text>
        Seems like we are having some issues, please wait a moment and try again
      </Text>
    );
  }
}

export default async function Listings() {
  // TODO:  Add fallback for case when data fails to load
  return (
    <>
      <Flex
        minH={"90vh"}
        align={"flex-start"}
        justify={"flex-start"}
        bg={"gray.100"}
      >
        <Stack
          spacing={8}
          mx={"auto"}
          minH={"80vh"}
          width={"60vw"}
          align={"center"}
          py={2}
        >
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          >
            {await renderCards()}
          </SimpleGrid>
        </Stack>
      </Flex>
    </>
  );
}
