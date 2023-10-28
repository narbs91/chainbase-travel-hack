"use client";
import React from "react";
import { Text, Center, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const PropertyDetailDataLoadErrorComponent = () => {
  const router = useRouter();
  const goToSearch = () => {
    router.push("/listings");
  };
  return (
    <Center height="100vh" flexDirection="column">
      <Text
        mt={4}
        fontSize={{ base: "md", sm: "lg", md: "xl" }}
        fontWeight="bold"
        color="gray.600"
        textAlign={'center'}
      >
        Oops! We could not load the property data. It either does not exist or has
        just sold. Please try another listing
      </Text>
      <Button mt={4} colorScheme="blue" onClick={goToSearch}>
        Search Listings
      </Button>
    </Center>
  );
};

export default PropertyDetailDataLoadErrorComponent;