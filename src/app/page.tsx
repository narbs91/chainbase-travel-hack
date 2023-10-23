'use client'

import PageLayout from './components/layout/page'
import { Container, Heading, VStack, chakra, Text, Button } from '@chakra-ui/react'

export default function Home() {
  return (
   <PageLayout>
    <Container maxW={{ base: "sm", sm: "xl" }} padding="20px">
        <VStack spacing={5}>
          <Heading as="h1">
            <chakra.span
              bgClip="text"
              bgGradient={"linear(135deg, #6699FF 0%, #FF3366 100%)"}
            >
              Title of our app
            </chakra.span>
          </Heading>
        </VStack>
        <VStack>
          <Text>
            This is a one liner of what our app does
          </Text>
        </VStack>
      </Container>
      <chakra.main>
        <Container
          title="gpc-landing-page"
          maxW={{ base: "sm", sm: "xl" }}
          marginTop="-65px"
        >
          <VStack marginBottom="130px" marginTop="50px">
            <Button>Login with Magic</Button>
          </VStack>
        </Container>
      </chakra.main>
   </PageLayout>
  )
}
