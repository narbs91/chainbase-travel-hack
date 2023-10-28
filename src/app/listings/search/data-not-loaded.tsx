"use client";
import React from "react";
import { Text, Center, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const DataLoadErrorComponent = () => {
  const router = useRouter();
  const refresh = () => {
    router.refresh();
  };
  return (
    <Center height="100vh" flexDirection="column">
      <Text
        mt={4}
        fontSize={{ base: "md", sm: "lg", md: "xl" }}
        fontWeight="bold"
        color="gray.600"
        textAlign={"center"}
      >
        Oops! We couldnt load the data.
      </Text>
      <Text mt={2} fontSize="md" color="gray.500">
        Please wait a moment and try again.
      </Text>
      <Button mt={4} colorScheme="blue" onClick={refresh}>
        Retry
      </Button>
    </Center>
  );
};

export default DataLoadErrorComponent;
