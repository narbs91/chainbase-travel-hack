'use client'
import React from "react";
import { Box, Text, Icon, Center, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const DataLoadErrorComponent = () => {
  const router = useRouter();
  const refresh = () => {
    router.refresh();
  };
  return (
    <Center height="100vh" flexDirection="column">
      <Text mt={4} fontSize="xl" fontWeight="bold" color="gray.600">
        Oops! We couldnt load the data.
      </Text>
      <Text mt={2} fontSize="md" color="gray.500">
        Please wait a moment and try again.
      </Text>
      <Button mt={4} colorScheme="teal" onClick={refresh}>
        Retry
      </Button>
    </Center>
  );
};

export default DataLoadErrorComponent;
