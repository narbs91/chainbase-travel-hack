"use client";

import PageLayout from "../components/layout/page";
import {
  Container,
  Heading,
  VStack,
  chakra,
  Text,
  Button,
} from "@chakra-ui/react";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <PageLayout>
      <Container maxW={{ base: "sm", sm: "xl" }} textAlign={"center"}>
        <Heading
          bgClip="text"
          bgGradient={"linear(135deg, #6699FF 0%, #FF3366 100%)"}
          padding={4}
        >
          Login or Create an Account
        </Heading>
        <Text as='em' color="black">
          Creating an account will allow you to buy a hotel stay and let you
          list your own bookings for sale on the ReBookT marketplace!
        </Text>
      </Container>

      <Container maxW={{ base: "sm", sm: "xl" }}>
        <LoginForm />
      </Container>
    </PageLayout>
  );
}
