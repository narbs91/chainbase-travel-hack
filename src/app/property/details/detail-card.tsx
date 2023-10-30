"use client";

import { Property } from "@/app/types/property";
import {
  Box,
  Image,
  Text,
  VStack,
  Heading,
  FormLabel,
  Button,
} from "@chakra-ui/react";

const DetailCard = ({ listing }: { listing: Property }) => {
  return (
    <Box
      p={[2, 4, 6]}
      maxWidth="1200px"
      margin="0 auto"
      bg={"gray.100"}
      marginTop={3}
      marginBottom={3}
      shadow={"lg"}
    >
      {/* Hero Image */}
      <Image
        src={listing.imageUrl || "/hotel_placeholder_image.png"}
        alt="Hotel Property"
        borderRadius="md"
        objectFit="cover"
        mb={6}
        width={"1200px"}
      />

      <VStack spacing={4} align="start">
        {/* Hotel Name */}
        <Heading size="xl" color="black">
          {listing.name}
        </Heading>

        {/* Hotel Address */}
        <Text fontSize="lg" color="gray.600">
          {listing.address}
        </Text>

        {/* Hotel Price */}
        <Text fontSize="2xl" color="teal.500">
          ${listing.price}
        </Text>

        {/* Hotel Description */}
        <Text color="black">
          <FormLabel>Room Details</FormLabel>
          {listing.description}
        </Text>

        {/* Check-in Date */}
        <Text color="black">
          <FormLabel>Check-in Date</FormLabel>
          {listing.checkInDate}
        </Text>

        {/* Check-out Date */}
        <Text color="black">
          <FormLabel>Check-Out Date</FormLabel>
          {listing.checkoutDate}
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

export default DetailCard;
