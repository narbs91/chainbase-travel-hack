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
  Image,
  Box,
  ButtonGroup,
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
  <Card maxW="100%" direction="column">
      <CardBody>
        <Image
          width={'100%'}
          src={imageUrl || "./hotel_placeholder.png"}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>
          <Text>Check In: {new Date(checkInDate).toDateString()}</Text>
          <Text>Check Out: {new Date(checkoutDate).toDateString()}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter minW={"full"} justifyContent="space-between">
        <Text color="blue.600" fontSize="2xl">
          ${price}
        </Text>
        <Button variant="solid" colorScheme="blue">
          Select
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SearchResultCard;

{
  /* <Card
      direction={"column"}
      overflow="hidden"
      variant="outline"
    >
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
        minH={"30vh"}
        backgroundImage={imageUrl || "https://via.placeholder.com/500"}
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
      />
      <Divider />
      <CardFooter>
        <Stack minW={"full"} direction={"row"} justifyContent="space-between">
          <VStack>
            <Text> {description} </Text>
          </VStack>

          <Flex justifyContent="flex-end">
            <Button colorScheme="blue">Select</Button>
          </Flex>
        </Stack>
      </CardFooter>
    </Card> */
}

{
  /* <Card maxW="100%" direction="column">
      <CardBody>
        <Image
          width={'100%'}
          src={imageUrl || "./hotel_placeholder.png"}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>
          <Text>Check In: {new Date(checkInDate).toDateString()}</Text>
          <Text>Check Out: {new Date(checkoutDate).toDateString()}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter minW={"full"} justifyContent="space-between">
        <Text color="blue.600" fontSize="2xl">
          ${price}
        </Text>
        <Button variant="solid" colorScheme="blue">
          Select
        </Button>
      </CardFooter>
    </Card> */
}
