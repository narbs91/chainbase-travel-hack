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
  Flex,
} from "@chakra-ui/react";
import { PropertyService } from "../api/impl/service/supply/property/property.service";

async function getData() {
  const propertyService = new PropertyService()
  const listing = await propertyService.getPropertyListings(1,1)

  return listing;
}

async function renderCards() {
  try {
    const listings = await getData();
    return listings.map((listing) => {
      return (
        <Card key={"temp"} w={"40vw"}>
          <CardBody minH={"20vh"} backgroundImage={
        `url(${listing.imageUrl})`
      } backgroundSize={'cover'}
      backgroundPosition={'center center'}>
          </CardBody>
          <Divider />
          <CardFooter>
            <Stack minW={"full"} direction={"row"} justifyContent="space-between" alignContent="center">
              <Heading> {listing.name} </Heading>
              <Text fontSize={"2xl"}>${listing.price}</Text>
            </Stack>
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
    <>
      <Flex
        minH={"90vh"}
        align={"flex-start"}
        justify={"flex-start"}
        bg={'gray.100'}
      >
        <Stack spacing={8} mx={"auto"} minH={"80vh"} width={"60vw"} align={'center'} py={2}>
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