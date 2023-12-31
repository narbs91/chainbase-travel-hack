"use client";

import React from "react";

import { Button, Link } from "@chakra-ui/react";
import { useGlobalContext } from "@/app/context/context";
import { User } from "@/app/types/user";
import { magic } from "@/app/auth/magic";
import { useRouter } from "next/navigation";

export default function NavItems() {
  const { user, setUser } = useGlobalContext();
  const router = useRouter();

  const logout = async () => {
    await magic?.user.logout();
    setUser({} as User);
    router.push("/login");
  };

  let userProfileButton;
  if (user?.email) {
    userProfileButton = (
      <>
        <Link>
          <Button
            onClick={logout}
            color="white"
            title="nav-logout-button"
            colorScheme="red"
          >
            Logout
          </Button>
        </Link>
      </>
    );
  } else {
    userProfileButton = (
      <>
        <Link>
          <Button
            color="white"
            title="nav-login-button"
            onClick={() => router.push("/login")}
            colorScheme="green"
          >
            Login
          </Button>
        </Link>
      </>
    );
  }

  return (
    <>
      <Link>
        <Button
          color="black"
          variant="ghost"
          title="nav-home-button"
          onClick={() => router.push("/")}
        >
          Home
        </Button>
      </Link>
      <Link>
        <Button
          color="black"
          variant="ghost"
          title="nav-about-button"
          onClick={() => router.push("/about")}
        >
          About
        </Button>
      </Link>
      <Link>
        <Button
          color="black"
          variant="ghost"
          title="nav-search-button"
          onClick={() => router.push("/listings")}
        >
          Shop
        </Button>
      </Link>
      {user?.email && (
        <Link>
          <Button
            color="black"
            variant="ghost"
            title="nav-dashboard-button"
            onClick={() => router.push("/dashboard")}
          >
            Dashboard
          </Button>
        </Link>
      )}
      {userProfileButton}
    </>
  );
}
