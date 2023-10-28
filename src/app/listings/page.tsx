import { Text, SimpleGrid, Stack, Flex, list, VStack } from "@chakra-ui/react";
import { PropertyService } from "../api/impl/service/supply/property/property.service";
import SearchResultCard from "./search/search-result-card";
import DataLoadErrorComponent from "./search/data-not-loaded";
import { Property } from "../types/property";

async function getData() {
  const propertyService = new PropertyService();
  const listings = await propertyService.getPropertyListings(20, 1);

  return listings;
}

function renderCards(listings: Property[]) {
  try {
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
      <Text color={'black'}>
        Seems like we are having some issues, please wait a moment and try again
      </Text>
    );
  }
}

export default async function Listings() {
  const listings = await getData();

  if (listings.length < 1) {
    return (
      <>
        <DataLoadErrorComponent />
      </>
    );
  }

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
          <SimpleGrid spacing={10} columns={1}>
            {renderCards(listings)}
          </SimpleGrid>
        </Stack>
      </Flex>
    </>
  );
}
