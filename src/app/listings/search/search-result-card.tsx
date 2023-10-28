import React from "react";
import {
  Text,
  Button,
  Card,
  Stack,
  Heading,
  CardBody,
  Divider,
  CardFooter,
  Image,
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
