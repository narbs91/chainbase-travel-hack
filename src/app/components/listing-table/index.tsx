"use client";
import { useGlobalContext } from "@/app/context/context";
import loading from "@/app/listings/loading";
import { Property } from "@/app/types/property";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Text,
  Th,
  Tbody,
  Td,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Stack,
  InputLeftElement,
  InputRightElement,
  Textarea,
  ModalHeader,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import ListingForm from "../listing-form";

export default function ListingsTable({
  listed = false,
  propertyListings = [],
}: {
  listed: boolean;
  propertyListings: Property[];
}) {
  let tableCaption;
  let { isOpen, onOpen, onClose } = useDisclosure();

  if (propertyListings.length == 0) {
    return "No listings available";
  } else {
    tableCaption = listed
      ? `You currently have ${propertyListings.length} listings on
        Market`
      : `You currently have ${propertyListings.length} unlisted properties`;

    return (
      <TableContainer>
        <Table variant="simple">
          <TableCaption>{tableCaption}</TableCaption>
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
            {propertyListings.map((listing: Property) => {
              return (
                <Tr key={listing.name}>
                  <Td>
                    <Text color={"blackAlpha.900"}>{listing.name}</Text>
                  </Td>
                  <Td>
                    <Text color={"blackAlpha.900"}>{listing.price}</Text>
                  </Td>
                  <Td>
                    {listed ? (
                      <Button>Edit</Button>
                    ) : (
                      <>
                        <Button onClick={onOpen}>List</Button>
                        <>
                          <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                              <ListingForm
                                listing={listing}
                                closeModal={onClose}
                              ></ListingForm>
                            </ModalContent>
                          </Modal>
                        </>
                      </>
                    )}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    );
  }
}
