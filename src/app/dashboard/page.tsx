"use client";
import { useEffect } from "react";
import { useGlobalContext } from "../context/context";
import { Property } from "../types/property";
import useSWR from "swr";

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
  Skeleton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";

import { UserPropertiesResponse } from "../api/impl/types/httpResponses";
import ListingsTable from "../components/listing-table";

export default function Dashboard() {
  const { user } = useGlobalContext();
  const { colorMode } = useColorMode();
  let { isOpen, onOpen, onClose } = useDisclosure();

  let loading = false;

  async function fetcher<JSON = any>(url: string): Promise<JSON> {
    const res = await fetch(url);
    return res.json();
  }

  async function importUnlistedProperties() {
    loading = true;
    const res = fetch(`/api/import`);

    const unlistedProperties = await (await res).json();
    if (unlistedProperties) {
      onClose();
      user.unlistedBookings = unlistedProperties.bookings;
    }
    loading = false;
  }

  const { data, error, isLoading } = useSWR<UserPropertiesResponse>(
    `/api/listings?walletAddress=${user.walletAddress}`,
    fetcher
  );

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
              <Stack dir="row">
                <Box alignSelf={"flex-end"} maxW={"20vw"}>
                  <Button colorScheme="red" onClick={onOpen}>
                    Import Listings
                  </Button>
                </Box>

                {user?.email && (
                  <>
                    <Heading
                      alignContent={"flex-start"}
                      alignSelf={"center"}
                      p={"2"}
                      fontSize={"3xl"}
                      color={
                        colorMode == "light"
                          ? "blackAlpha.900"
                          : "whiteAlpha.900"
                      }
                    >
                      Welcome!
                    </Heading>
                  </>
                )}
              </Stack>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent minW={"38vw"}>
                    {loading ? (
                      <ModalBody>
                        <Stack textAlign={"center"}>
                          <Spinner
                            m={10}
                            alignSelf="center"
                            size="xl"
                            color="black"
                          />
                        </Stack>
                      </ModalBody>
                    ) : (
                      <>
                        <ModalBody>
                          <Stack textAlign={"center"}>
                            {loading.toString()}
                            <Text fontSize={"2xl"} mt={10} color="black">
                              Using {user.email} to import all possible
                              lisitings.
                            </Text>
                             <Text mt="4" fontWeight={"bold"} color="black">
                              Are you sure?
                            </Text>
                          </Stack>
                        </ModalBody>
                        <ModalFooter>
                          <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={importUnlistedProperties}
                          >
                            Import
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
            </Stack>
            <Divider />
            <Stack spacing={4}>
              <Skeleton isLoaded={!isLoading}>
                <ListingsTable
                  listed={false}
                  propertyListings={user.unlistedBookings}
                />
                {user?.unlistedBookings?.length > 0 &&
                data &&
                data.properties.length > 0 ? (
                  <Divider pt={2} />
                ) : (
                  ""
                )}
                {data ? (
                  <ListingsTable
                    listed={true}
                    propertyListings={data.properties}
                  />
                ) : (
                  ""
                )}
              </Skeleton>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
