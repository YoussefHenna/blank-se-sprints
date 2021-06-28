import axios from "axios";
import React from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

let defaultValue: any;
const AuthContext = createContext(defaultValue);
let user: any;
function AuthContextProvider(props: any) {
  const [loggedIn, setLoggedIn] = useState(undefined);

  async function getLoggedIn() {
    const { data: loggedInRes } = await axios.get(
      "http://localhost:3500/auth/loggedIn",
      {
        //        withCredentials: true,
      }
    );
    // const { bool, jwt: usery } = loggedInRes;
    // user = usery;
    setLoggedIn(loggedInRes);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, user }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
