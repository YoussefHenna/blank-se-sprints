import axios from "axios";
import React, { ReactChild, ReactFragment, ReactPortal } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

interface AuthContextProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  jwt: string | undefined;
  isSignedIn: boolean;
  userType: "student" | "admin" | "intructor" | undefined;
}
const AuthContext = createContext<AuthContextType>({
  jwt: undefined,
  isSignedIn: false,
  userType: undefined,
});

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [currentAuthContextState, setAuthContextState] =
    useState<AuthContextType>({
      jwt: undefined,
      isSignedIn: false,
      userType: undefined,
    });

  const getLoggedIn = async () => {
    const { data } = await axios.get("http://localhost:3500/auth/loggedIn", {
      withCredentials: true,
    });
    setAuthContextState(data as unknown as AuthContextType);
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={currentAuthContextState}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
