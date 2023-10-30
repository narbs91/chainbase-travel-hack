"use client";

import { useRouter } from "next/navigation";
import PageLayout from "./components/layout/page";
import {
  Container,
  Heading,
  VStack,
  chakra,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";

export default function Home() {
  const router = useRouter()

  const shopNow = () => {
    router.push("/listings")
  }
  return (
    <PageLayout>
      <Container maxW={{ base: "sm", sm: "xl" }} padding="20px">
        <VStack spacing={5}>
          <Heading as="h1">
            <chakra.span
              bgClip="text"
              bgGradient={"linear(135deg, #6699FF 0%, #FF3366 100%)"}
            >
              ReBookt
            </chakra.span>
          </Heading>
          <VStack spacing={5}>
            <Image
              title="rebookt-logo"
              src="/rebookt_logo.png"
              alt="ReBookT logo"
              width={300}
            />
          </VStack>
        </VStack>
        <VStack padding={2}>
          <Heading as="h2" color="black" textAlign={"center"}>
            We let you buy and sell hotel bookings on a secondary market
          </Heading>
        </VStack>
      </Container>
      <chakra.main>
        <Container
          title="gpc-landing-page"
          maxW={{ base: "sm", sm: "xl" }}
          marginTop="-65px"
        >
          <VStack marginBottom="130px" marginTop="50px">
            <Button
              bgClip="bg"
              bgGradient={"linear(135deg, #6699FF 0%, #FF3366 100%)"}
              color={"white"}
              onClick={shopNow}
            >
              Browse Listings
            </Button>
          </VStack>
        </Container>
      </chakra.main>
    </PageLayout>
  );
}
