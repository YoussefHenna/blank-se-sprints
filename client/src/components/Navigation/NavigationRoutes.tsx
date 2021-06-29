import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "../../pages/Home/HomePage";
import LoginPage from "../../pages/Login/LoginPage";
import RegisterPage from "../../pages/Register/RegisterPage";
import AdminCourseEditPage from "../../pages/AdminCourseEdit/AdminCourseEditPage";
import StudentMajorInfoPage from "../../pages/StudentMajorInfo/StudentMajorInfoPage";
import StudentViewGradesPage from "../../pages/Grades/StudentViewGrades/StudentViewGradesPage";
import StudentViewSchedule from "../../pages/StudentViewSchedule/StudentViewSchedulePage";
import AdminCreateSchedulePage from "../../pages/AdminCreateSchedule/AdminCreateSchedulePage";
import ChangePasswordPage from "../../pages/ChangePassword/ChangePasswordPage";
import TAUpdateGradePage from "../../pages/Grades/TAUpdateGrade/TAUpdateGradePage";
import TAViewClassesPage from "../../pages/TAViewClasses/TAViewClassesPage";
import ApplyToUniPage from "../../pages/ApplyToUni/ApplyToUniPage";
import { useStyles } from "../../AppStyles";
import { useContext } from "react";
import { AuthContext } from "../Context/Authcontext";

interface NavigationRoutesProps {
  setUserType: (type: "student" | "TA" | "admin") => void;
}
const NavigationRoutes: React.FC<NavigationRoutesProps> = (props) => {
  const classes = useStyles();
  const { isSignedIn, userType } = useContext(AuthContext);
  let AvaiableRoutes = <></>;

  if (!isSignedIn) {
    AvaiableRoutes = (
      <>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Redirect exact to="/login" />
      </>
    );
  } else if (userType === "student") {
    AvaiableRoutes = (
      <>
        <Route path="/student/major">
          <StudentMajorInfoPage />
        </Route>
        <Route path="/student/grades">
          <StudentViewGradesPage />
        </Route>
        <Route path="/student/schedule">
          <StudentViewSchedule />
        </Route>
        <Route path="/change-password">
          <ChangePasswordPage />
        </Route>
        <Redirect exact to="/student/major" />
      </>
    );
  } else if (userType === "instructor") {
    AvaiableRoutes = (
      <>
        <Route path="/instructor/grades">
          <TAUpdateGradePage />
        </Route>
        <Route path="/instructor/classes">
          <TAViewClassesPage />
        </Route>
        <Route path="/change-password">
          <ChangePasswordPage />
        </Route>
        <Redirect exact to="/instructor/grades" />
      </>
    );
  } else if (userType === "admin") {
    AvaiableRoutes = (
      <>
        <Route path="/admin/courses">
          <AdminCourseEditPage />
        </Route>
        <Route path="/admin/schedule">
          <AdminCreateSchedulePage />
        </Route>
        <Route path="/change-password">
          <ChangePasswordPage />
        </Route>
        <Redirect exact to="/admin/courses" />
      </>
    );
  }

  return (
    <div className={classes.background}>
      <Switch>
        {/* Routes open to everyone */}
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route path="/apply">
          <ApplyToUniPage />
        </Route>

        {AvaiableRoutes}
      </Switch>
    </div>
  );
};

export default NavigationRoutes;
