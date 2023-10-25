"use client";
import { useGlobalContext } from "../context/context";
import { useRouter } from "next/navigation";
import { magic } from "@/auth/magic";
import { User } from "../types/user";

export default function Dashboard() {
  const { user, setUser } = useGlobalContext();
  const router = useRouter();

  const logout = async () => {
    await magic?.user.logout();
    setUser({} as User);
    router.push("/login");
  };

  //TODO
  return (
    <>
      {user?.email && (
        <>
          <h1>Dashboard</h1>
          <h2>Email</h2>
          <p>{user.email}</p>
          <h2>Wallet Address</h2>
          <p>{user.walletAddress}</p>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </>
  );
}
