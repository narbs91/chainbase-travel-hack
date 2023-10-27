"use client";
import { useGlobalContext } from "../context/context";
import { Property } from "../types/property";

//Temp
import mockedListings from "./mockListing.mock";

import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useColorMode,
  Divider,
  TableContainer,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user } = useGlobalContext();
  const { colorMode } = useColorMode();
  const router = useRouter();

  if (!user) {
    router.push('/login')
  }

  //TODO
  return (
    <>
      <Flex
        minH={"100vh"}
        align={"flex-start"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} minW={"full"} maxW={"lg"} py={2} px={6}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              {user?.email && (
                <>
                  <Heading
                    alignContent={"flex-start"}
                    p={"2"}
                    fontSize={"4xl"}
                    color={
                      colorMode == "light" ? "blackAlpha.900" : "whiteAlpha.900"
                    }
                  >
                    Welcome to your Dashboard {user.email}!
                  </Heading>
                  <p>{user.walletAddress}</p>
                </>
              )}
            </Stack>
            <Divider />
            <Stack spacing={4}>
              <TableContainer>
                <Table variant="simple">
                  <TableCaption>
                    You have currently {mockedListings.length} listings on
                    Market
                  </TableCaption>
                  <Thead>
                    <Tr>
                      {
                        <Th color={"black"}>
                          {<Text color={"blackAlpha.500"}>Name</Text>}
                        </Th>
                      }
                      {
                        <Th color={"black"}>
                          {<Text color={"blackAlpha.500"}>Price</Text>}
                        </Th>
                      }
                      {
                        <Th color={"black"}>
                          {<Text color={"blackAlpha.500"}>Edit</Text>}
                        </Th>
                      }
                    </Tr>
                  </Thead>
                  <Tbody>
                    {mockedListings.map((listing: Property) => {
                      return (
                        <Tr key={listing.name}>
                          <Td>
                            <Text color={"blackAlpha.900"}>{listing.name}</Text>
                          </Td>
                          <Td>
                            <Text color={"blackAlpha.900"}>
                              {listing.price}
                            </Text>
                          </Td>
                          <Td>
                            <Button color={"green"}>Edit</Button>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
