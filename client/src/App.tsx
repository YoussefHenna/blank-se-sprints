import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import {
  NavigationRoutes,
  NavigationBar,
  getNavigationItems,
} from "./components/Navigation/Navigation";
import "./App.css";
import { useState } from "react";

//Theme that will be used on all Material UI components
const theme = createMuiTheme({
  palette: {
    background: {
      default: "#f3f3f3",
    },
    primary: {
      main: "#db3b38",
      dark: "#a20011",
      light: "#ff7063",
    },
    secondary: {
      main: "#707070",
      dark: "#454545",
      light: "#9e9e9e",
    },
  },
  typography: {
    fontFamily: "Poppins",
    button: {
      textTransform: "none",
    },
  },
});

//Navigation Bar + all routes that app can take
const App: React.FC = () => {
  const [userType, setUserType] =
    useState<"student" | "TA" | "admin">("student");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div id="appMainContainer">
        <NavigationBar navItems={getNavigationItems(userType)} />
        <NavigationRoutes />
      </div>
    </ThemeProvider>
  );
};

export default App;
