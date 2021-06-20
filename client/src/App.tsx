import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
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
      main: "#f7b801",
      dark: "#bf8900",
      light: "#ffea4d",
    },
  },
  typography: {
    fontFamily: "Poppins",
    subtitle1: {
      fontWeight: 200,
      fontSize: 14,
    },
    fontWeightLight: 200,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    button: {
      textTransform: "none",
    },
  },
});

//Navigation Bar + all routes that app can take
const App: React.FC = () => {
  const [userType, setUserType] = useState<"student" | "TA" | "admin">("admin");

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div id="appMainContainer">
          <NavigationBar navItems={getNavigationItems(userType)} />
          <NavigationRoutes setUserType={setUserType} />
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
