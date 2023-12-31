'use client'

import React from "react";
import {
  Box,
  useColorModeValue,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
} from "@chakra-ui/react";
import NavItems from "./nav-items";
import { AiOutlineMenu } from "react-icons/ai";

export default function MobileNav() {
  const bg = useColorModeValue("white", "white");
  const { onClose, onOpen, isOpen } = useDisclosure();

  return (
    <Box display={{ base: "inline-flex", md: "none" }}>
      <IconButton
        display={{ base: "flex", md: "none" }}
        aria-label="Open menu"
        fontSize="20px"
        color="black"
        variant="ghost"
        icon={<AiOutlineMenu />}
        onClick={onOpen}
        title="mobile-nav-open-button"
      />

      <VStack
        pos="absolute"
        top={0}
        left={0}
        right={0}
        display={isOpen ? "flex" : "none"}
        flexDirection="column"
        pt={7}
        pb={7}
        m={0}
        bg={bg}
        spacing={3}
        rounded="sm"
        shadow="sm"
        zIndex="99"
        color="black"
      >
        <CloseButton
          aria-label="Close menu"
          onClick={onClose}
          color="black"
          title="mobile-nav-close-button"
        />

        <NavItems />
      </VStack>
    </Box>
  );
}