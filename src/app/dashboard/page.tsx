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

function ModalView(props: any) {
  if (props.success) {
    if (props.isLoading) {
      return <Spinner></Spinner>;
    } else {
      return <Text>Are you sure?</Text>;
    }
  } else {
    return <Text>Success!</Text>;
  }
}

export default function Dashboard() {
  const { user } = useGlobalContext();
  const { colorMode } = useColorMode();
  let { isOpen, onOpen, onClose } = useDisclosure();

  let loading = false;
  let success = false;

  async function fetcher<JSON = any>(url: string): Promise<JSON> {
    const res = await fetch(url);
    return res.json();
  }

  async function importUnlistedProperties() {
    loading = true;
    const res = fetch(`/api/import`);

    const unlistedProperties = await (await res).json();

    if (unlistedProperties) {
      loading = false;
      success = true;
      user.unlistedBookings = unlistedProperties.bookings;
    }
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
                    Welcome to your Dashboard {user.email} !
                  </Heading>
                </>
              )}
              <Button onClick={onOpen}>import</Button>
              <>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalBody>
                      <ModalView isLoading={loading}></ModalView>
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
                  </ModalContent>
                </Modal>
              </>
            </Stack>
            <Divider />
            <Stack spacing={4}>
              <Skeleton isLoaded={!isLoading}>
                <ListingsTable
                  listed={false}
                  propertyListings={user.unlistedBookings}
                />
                {user?.unlistedBookings?.length > 0 &&
                user?.listingBookings?.length > 0 ? (
                  <Divider />
                ) : (
                  ""
                )}
                <ListingsTable
                  listed={true}
                  propertyListings={user.listingBookings}
                />
              </Skeleton>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
