"use client";

import React from "react";

import { Button, Link } from "@chakra-ui/react";
import { useGlobalContext } from "@/app/context/context";
import { User } from "@/app/types/user";
import { magic } from "@/auth/magic";
import { useRouter } from "next/navigation";

export default function NavItems() {
  const { user, setUser } = useGlobalContext();
  const router = useRouter();

  const logout = async () => {
    await magic?.user.logout();
    setUser({} as User);
    router.push("/login");
  };

  let button;
  if (user?.email) {
    button = (
      <>
        <Link>
          <Button
            onClick={logout}
            color="black"
            variant="ghost"
            title="nav-search-button"
          >
            Logout
          </Button>
        </Link>
      </>
    );
  } else {
    button = (
      <>
        <Link>
        <Button
          color="black"
          variant="ghost"
          title="nav-search-button"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
        </Link>
      </>
    );
  }

  return <>
    <Link>
        <Button
          color="black"
          variant="ghost"
          title="nav-search-button"
          onClick={() => router.push("/")}
        >
          Home
        </Button>
        </Link>
  {button}</>;
}
