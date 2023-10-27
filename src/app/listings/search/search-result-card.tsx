import React from "react";
import {
  Text,
  Button,
  Flex,
  Card,
  CardHeader,
  Stack,
  Heading,
  CardBody,
  Divider,
  CardFooter,
  VStack,
} from "@chakra-ui/react";

const SearchResultCard = ({
  name,
  price,
  imageUrl,
  checkInDate,
  checkoutDate,
  description,
}: {
  name: string;
  price: number;
  imageUrl: string;
  checkInDate: string;
  checkoutDate: string;
  description: string;
}) => {
  return (
    <Card key={"temp"} w={"40vw"}>
      <CardHeader backgroundPosition={"center center"}>
        <Stack
          minW={"full"}
          direction={"row"}
          justifyContent="space-between"
          alignContent="center"
        >
          <Heading> {name} </Heading>
          <Text as="b" fontSize={"2xl"}>
            ${price}
          </Text>
        </Stack>
        <Stack
          minW={"full"}
          direction={"row"}
          justifyContent="space-between"
          alignContent="center"
        >
          <Text> Check in: {checkInDate}</Text>
        </Stack>
        <Stack
          minW={"full"}
          direction={"row"}
          justifyContent="space-between"
          alignContent="center"
        >
          <Text> Check out: {checkoutDate} </Text>
        </Stack>
      </CardHeader>
      <CardBody
        minH={"20vh"}
        backgroundImage={"https://via.placeholder.com/500"}
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
      />
      <Divider />
      <CardFooter>
        <Stack minW={"full"} direction={"row"} justifyContent="space-between">
          <VStack>
            <Text as="b"> {description} </Text>
          </VStack>

          <Flex justifyContent="flex-end">
            <Button colorScheme="teal">Select</Button>
          </Flex>
        </Stack>
      </CardFooter>
    </Card>
  );
};

export default SearchResultCard;
