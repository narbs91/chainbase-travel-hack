import React from "react";
import {
  Box,
  Image,
  Text,
  VStack,
  Heading,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { PropertyService } from "@/app/api/impl/service/supply/property/property.service";

async function getData(id: string) {
  const propertyService = new PropertyService();
  const listing = await propertyService.getPropertyListing(id);

  return listing;
}

const HotelDetailsPage = async ({ params }: { params: { id: string } }) => {
  const property = await getData(params.id);

  return (
    <Box p={[2, 4, 6]} maxWidth="1200px" margin="0 auto" bg={"gray.100"}>
      {/* Hero Image */}
      <Image
        src={property.imageUrl || "https://via.placeholder.com/1200x400"}
        alt="Hotel Property"
        borderRadius="md"
        objectFit="cover"
        mb={6}
        width={"1240px"}
        height={"400px"}
      />

      <VStack spacing={4} align="start">
        {/* Hotel Name */}
        <Heading size="xl" color="black">
          {property.name}
        </Heading>

        {/* Hotel Address */}
        <Text fontSize="lg" color="gray.600">
          {property.address}
        </Text>

        {/* Hotel Price */}
        <Text fontSize="2xl" color="teal.500">
          ${property.price}
        </Text>

        {/* Hotel Description */}
        <Text color="black">
          <FormLabel>Room Details</FormLabel>
          {property.description}
        </Text>

        {/* Check-in Date */}
        <Text color="black">
          <FormLabel>Check-in Date</FormLabel>
          {property.checkInDate}
        </Text>

        {/* Check-out Date */}
        <Text color="black">
          <FormLabel>Check-Out Date</FormLabel>
          {property.checkoutDate}
        </Text>

        {/* Number of Guests */}
        <Text color="black">
          <FormLabel>Number of Guests</FormLabel>1
        </Text>

        {/* Proceed to Checkout Button */}
        <Button colorScheme="blue" alignSelf="flex-end" isDisabled={true}>
          Checkout (Coming Soon)
        </Button>
      </VStack>
    </Box>
  );
};

export default HotelDetailsPage;
