import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import {
  NavigationRoutes,
  NavigationBar,
  getNavigationItems,
} from "./components/Navigation/Navigation";
import { useStyles } from "./AppStyles";
import { useEffect, useState } from "react";
import { AuthContextProvider } from "./components/Context/Authcontext";
// import axios from "axios";

// axios.defaults.withCredentials = true;

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
  const [userType, setUserType] = useState<
    "student" | "TA" | "admin" | undefined
  >(undefined);
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  // TODO: remove this, and use authentication
  const setTypeFromRoute = (path: string) => {
    if (path.includes("student") && userType != "student") {
      setUserType("student");
    } else if (path.includes("instructor") && userType != "TA") {
      setUserType("TA");
    } else if (path.includes("admin") && userType != "admin") {
      setUserType("admin");
    } else if (
      !path.includes("student") &&
      !path.includes("instructor") &&
      !path.includes("admin") &&
      userType != undefined
    ) {
      setUserType(undefined);
    }
  };

  useEffect(() => {
    if (location) {
      setTypeFromRoute(location.pathname.toString());
    }
  }, [location]);

  setTypeFromRoute(history.location.pathname.toString());

  const navItems = getNavigationItems(userType);

  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.appMainContainer}>
          {navItems && <NavigationBar navItems={navItems} />}
          <NavigationRoutes setUserType={setUserType} />
        </div>
      </ThemeProvider>
    </AuthContextProvider>
  );
};

export default App;
