import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "../../pages/Home/HomePage";
import LoginPage from "../../pages/Login/LoginPage";
import RegisterPage from "../../pages/Register/RegisterPage";
import AdminCourseEditPage from "../../pages/AdminCourseEdit/AdminCourseEditPage";
import StudentMajorInfoPage from "../../pages/StudentMajorInfo/StudentMajorInfoPage";
import StudentViewGradesPage from "../../pages/StudentViewGrades/StudentViewGradesPage";
import StudentViewSchedule from "../../pages/StudentViewSchedule/StudentViewSchedulePage";
import ApplyToUniPage from "../../pages/ApplyToUni/ApplyToUniPage";
import { Typography } from "@material-ui/core";
import { useStyles } from "../../AppStyles";

interface NavigationRoutesProps {
  setUserType: (type: "student" | "TA" | "admin") => void;
}
const NavigationRoutes: React.FC<NavigationRoutesProps> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.background}>
      <Switch>
        {/* Routes for all users */}
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/apply">
          <ApplyToUniPage />
        </Route>
        <Route path="/login">
          <LoginPage setUserType={props.setUserType} />
        </Route>
        <Route path="/register">
          <RegisterPage setUserType={props.setUserType} />
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
  );
};

export default NavigationRoutes;
