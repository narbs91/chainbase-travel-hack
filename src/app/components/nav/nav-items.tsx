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

  let userProfileButton;
  if (user?.email) {
    userProfileButton = (
      <>
        <Link>
          <Button
            onClick={logout}
            color="black"
            variant="ghost"
            title="nav-logout-button"
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
            color="black"
            variant="ghost"
            title="nav-login-button"
            onClick={() => router.push("/login")}
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
