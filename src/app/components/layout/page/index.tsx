'use client'

import React from "react";
import { Stack } from "@chakra-ui/react";

const PageLayout = ({ children }: { children?: any }): JSX.Element => {
  return (
    <>
      <Stack
        spacing={10}
        padding={1}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        minHeight="100vh"
      >
        {children}
      </Stack>
    </>
  );
};

export default PageLayout;