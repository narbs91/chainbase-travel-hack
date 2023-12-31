"use client";

import React from "react";
import { chakra, Flex, HStack, Avatar } from "@chakra-ui/react";
import MobileNav from "./mobile-nav";
import NavItems from "./nav-items";

/**
 * Implementation inspired from the developer dao website
 *
 * source: https://github.com/Developer-DAO/developerdao.com
 *  */
export default function Nav() {
  return (
    <chakra.nav
      borderBottom=".1px solid"
      borderColor="black"
      backgroundColor="white"
      minWidth="100vw"
      title="gpc-nav"
      minH="5vh"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mx="auto"
        py={3}
        px={5}
      >
        <HStack as="a" display="flex" alignItems="center">
          <Avatar
            src="./rebookt_logo.png"
            title="rebookt-icon"
            border={"none"}
          />

          <chakra.span
            fontWeight="bold"
            fontSize="lg"
            transition="color 300ms ease-in-out"
            color="black"
            title="nav-reebokt-logo"
          >
            ReBookt
          </chakra.span>
        </HStack>

        <HStack display="flex" alignItems="center" spacing={1}>
          <HStack
            spacing={{ base: 3, sm: 10 }}
            display={{ base: "none", md: "inline-flex" }}
          >
            <NavItems />
          </HStack>

          <MobileNav />
        </HStack>
      </Flex>
    </chakra.nav>
  );
}
