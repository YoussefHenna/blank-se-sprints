import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import AdminCourseEditPage from "./pages/AdminCourseEdit/AdminCourseEditPage";
import StudentMajorInfoPage from "./pages/StudentMajorInfo/StudentMajorInfoPage";
import StudentViewGradesPage from "./pages/StudentViewGrades/StudentViewGradesPage";
import StudentViewSchedule from "./pages/StudentViewSchedule/StudentViewSchedulePage";
import "./App.css";

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

//Top Bar + all routes that app can take
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="background">
          <Switch>
            {/* Routes for all users */}
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            {/* ////////////////////// */}

            {/* Routes for students */}
            <Route path="/student/major">
              <StudentMajorInfoPage />
            </Route>
            <Route path="/student/grades">
              <StudentViewGradesPage />
            </Route>
            <Route path="/student/schedule">
              <StudentViewSchedule />
            </Route>
            <Route path="/student/grades">
              <StudentViewGradesPage />
            </Route>
            {/* ////////////////////// */}

            {/* Routes for admin */}
            <Route path="/admin/courses">
              <AdminCourseEditPage />
            </Route>
            {/* ////////////////////// */}

            <Route
              path="*"
              exact={true}
              component={() => <Typography>Page not found</Typography>}
            />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
