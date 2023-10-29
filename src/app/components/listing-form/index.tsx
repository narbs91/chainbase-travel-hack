"use client";
import { useGlobalContext } from "@/app/context/context";
import { Property } from "@/app/types/property";
import {
  InputGroup,
  InputLeftAddon,
  Input,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export default function ListingForm({
  listing,
  closeModal,
}: {
  listing: Property;
  closeModal: () => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Property>();
  let { user } = useGlobalContext();
  const [formLoading, setFormLoading] = useState(false);

  async function submitNft(updateListing: Property) {
    listing.price = updateListing.price;
    listing.description = updateListing.description;

    if (user && user.walletAddress != null) {
      listing.lister = user.walletAddress;
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listing),
      });

      if (res.ok) {
        const index = user.unlistedBookings.findIndex(
          (userUnlistedBooking) => userUnlistedBooking.id == listing.id
        );
        user.unlistedBookings.splice(index, 1);
      }
      closeModal();
    }
    setFormLoading(false);
  }

  return (
    <>
      {formLoading ? (
        <Spinner m={10} alignSelf="center" size="xl" color="black" />
      ) : (
        <form onSubmit={handleSubmit(submitNft)}>
          <ModalHeader alignSelf={"center"} mt="2" color={"blackAlpha.800"}>
            Listing Details
          </ModalHeader>
          <ModalBody>
            <Stack spacing={4}>
              <InputGroup color="black">
                <InputLeftAddon children="Name" />
                <Input
                  disabled={true}
                  value={listing.name}
                  variant="outline"
                  placeholder="Outline"
                />
              </InputGroup>
              <InputGroup color="black">
                <InputLeftAddon children="Address" />
                <Input
                  disabled={true}
                  value={listing.address}
                  variant="outline"
                  placeholder="Outline"
                />
              </InputGroup>
              <InputGroup color="black">
                <InputLeftAddon children="Checkin Date" />
                <Input
                  disabled={true}
                  value={listing.checkInDate}
                  variant="outline"
                  placeholder="Outline"
                />
              </InputGroup>
              <InputGroup color="black">
                <InputLeftAddon children="Checkout Date" />
                <Input
                  disabled={true}
                  value={listing.checkoutDate}
                  variant="outline"
                  placeholder="Outline"
                />
              </InputGroup>
              {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
              <InputGroup color="black">
                <InputLeftAddon children="Price" />
                <Input
                  defaultValue={listing.price}
                  placeholder="Enter amount"
                  {...register("price")}
                />
              </InputGroup>
              <InputGroup color="black">
                <InputLeftAddon children="Short Description" />
                <Input
                  color="black"
                  placeholder="Here is a sample placeholder"
                  defaultValue={listing.description}
                  {...register("description")}
                />
              </InputGroup>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Close
            </Button>
            <Button variant="ghost" type="submit">
              List
            </Button>
          </ModalFooter>
        </form>
      )}
    </>
  )
}
