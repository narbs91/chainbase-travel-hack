'use client'

import React from "react";

import { Button, Link } from "@chakra-ui/react";

export default function NavItems() {

  return (
    <>
      <Link href="/">
        <Button color="black" variant="ghost" title="nav-search-button">
          Home
        </Button>
      </Link>
    </>
  );
}