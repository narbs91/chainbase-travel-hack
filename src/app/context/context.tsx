"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { User } from "../types/user";

interface ContextProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const UserContext = createContext<ContextProps>({
  user: {
    email: "",
    walletAddress: "",
    listingBookings: [],
    unlistedBookings: [],
  },
  setUser: () => {},
});

export const GlobalContextProvider = ({ children }: any) => {
  const [user, setUser] = useState({} as User);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useGlobalContext = () => useContext(UserContext);
