"use client"
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
} from "@chakra-ui/react";
import React from "react";

export default function ListingsTable({
  listed = false,
  propertyListings = [],
}: {
  listed: boolean;
  propertyListings: Property[];
}) {
  let tableCaption;
  let { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState('')
  const { user } = useGlobalContext();
  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setValue(event.target.value)
  
  async function submitNft(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, listing: Property){
    if (user && user.walletAddress != null) {
        listing.lister = user.walletAddress
        const res = await fetch('/api/listings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(listing),
        })
    
        if (res.ok) {
            const index = user.unlistedBookings.findIndex((userUnlistedBooking)=> userUnlistedBooking.id == listing.id)
            user.unlistedBookings.splice(index,1)
        }
    }
  }

  if (propertyListings.length == 0) {
    return "No listings available";
  } else {
    tableCaption = listed
      ? `You have currently ${propertyListings.length} listings on
        Market`
      : `You have currently ${propertyListings.length} unlisted properties`;


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
                      <Button color={"blue"}>Edit</Button>
                    ) : (
                      <>
                        <Button onClick={onOpen}>import</Button>
                        <>
                          <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                              <ModalBody>
                              <Stack spacing={4}>
                              <Input disabled={true} value={listing.name} variant='outline' placeholder='Outline' />
                              <Input disabled={true} value={listing.address} variant='outline' placeholder='Outline' />
                              <Input disabled={true} value={listing.checkInDate} variant='outline' placeholder='Outline' />
                              <Input disabled={true} value={listing.checkoutDate} variant='outline' placeholder='Outline' />
                                {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
                                <InputGroup>
                                    <InputLeftElement
                                    pointerEvents='none'
                                    color='gray.300'
                                    fontSize='1.2em'
                                    children='$'
                                    />
                                    <Input value={listing.price} placeholder='Enter amount'  onChange={handleChange} />
                                </InputGroup>
                                <Textarea placeholder='Here is a sample placeholder' value={listing.description}  onChange={handleChange}/>
                                </Stack>
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  colorScheme="blue"
                                  mr={3}
                                  onClick={onClose}
                                >
                                  Close
                                </Button>
                                <Button
                                  variant="ghost"
                                  onClick={(e) => submitNft(e,listing)}
                                >
                                  Import
                                </Button>
                              </ModalFooter>
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
