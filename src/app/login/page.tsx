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
      <Heading
        bgClip="text"
        bgGradient={"linear(135deg, #6699FF 0%, #FF3366 100%)"}
      >
        Login or create account
      </Heading>
      <Text color="black" textAlign={"center"}>
        Creating an account will allow you to buy a hotel stay and let you list your own bookings for sale on the ReBookT marketplace!
      </Text>
      <Container maxW={{ base: "sm", sm: "xl" }} padding="20px">
        <LoginForm />
      </Container>
    </PageLayout>
  );
}
