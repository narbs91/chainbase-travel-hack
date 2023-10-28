import { Text, Spinner, Center } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Center height="100vh" background="white" flexDirection="column">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <Text
        mt={4}
        fontSize={{ base: "md", sm: "lg", md: "xl" }}
        fontWeight="bold"
        color={"black"}
        textAlign={"center"}
      >
        Hang tight while we find you some great get away spots!
      </Text>
    </Center>
  );
}
