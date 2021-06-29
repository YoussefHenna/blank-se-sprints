import { CircularProgress } from "@material-ui/core";
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
  userType: "student" | "admin" | "instructor" | undefined;
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
  const [loaded, setLoaded] = useState(false);

  const getLoggedIn = async () => {
    const { data } = await axios.get("http://localhost:3500/auth/loggedIn", {
      withCredentials: true,
    });
    setAuthContextState(data as unknown as AuthContextType);
    setLoaded(true);
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  if (!loaded) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <CircularProgress color="primary" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={currentAuthContextState}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
