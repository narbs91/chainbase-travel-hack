"use-client";

import React from "react";
import { Avatar, Box, Flex, Link, Text, HStack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="gray.800" color="white" py={4} px={6}>
      <Flex
        direction={"row"}
        justify="space-between"
        align="center"
        maxW="1200px"
        m="0 auto"
      >
        {/* Logo or Brand Name */}
        <HStack as="a" display="flex" alignItems="center">
          <Avatar
            src="./rebookt_logo.png"
            title="rebookt-footer-icon"
            border={"none"}
          />

          <Text
            fontWeight="bold"
            fontSize="lg"
            transition="color 300ms ease-in-out"
            color="white"
            title="nav-reebokt-footer-logo"
          >
            ReBookt
          </Text>
        </HStack>

        {/* Navigation Links */}
        <Flex direction={{ base: "column", md: "row" }}>
          <Link
            href="/about"
            color="gray.300"
            _hover={{ color: "white" }}
            padding={2}
          >
            About
          </Link>
          <Link
            href="/"
            color="gray.300"
            _hover={{ color: "white" }}
            padding={2}
          >
            Home
          </Link>
          <Link
            href="/login"
            color="gray.300"
            _hover={{ color: "white" }}
            padding={2}
          >
            Get Started
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
