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
      <Container maxW={{ base: "sm", sm: "xl" }} padding="20px">
        <VStack spacing={5}>
          <Heading as="h1">
            <chakra.span
              bgClip="text"
              bgGradient={"linear(135deg, #6699FF 0%, #FF3366 100%)"}
            >
              Login Powered by Magic
            </chakra.span>
          </Heading>
        </VStack>
        <VStack>
          <LoginForm />
        </VStack>
      </Container>
    </PageLayout>
  );
}
