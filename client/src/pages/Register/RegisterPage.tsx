import * as api from "./RegisterRequests";
import { useHistory } from "react-router-dom";
import { useStyles } from "./RegisterStyles";

interface RegisterPageProps {
  setUserType: (type: "student" | "TA" | "admin") => void;
}

/**
 * Login & register are special when it comes to navigation because they determine what user type is
 * call props.setUserType("student") for example if signed in user is a student (other options: TA, admin)
 *
 *
 * You also have to naviagate to the correct page after signing in, check NavigationRoutes.tsx to see all routes
 * To navigate use history.replace("/student/schedule") - which page to navigate to should depend on user type:
 * student should not be navigated to admin page for example.
 */

const RegisterPage: React.FC<RegisterPageProps> = (props) => {
  const history = useHistory();
  //Use this to navigate to different screens
  //Example: history.replace("/student/schedule") to navigate to student schedule page

  //Use like this <div className={classes.whateverStyle}/>
  const classes = useStyles();

  return <div>{/** Put ui elements here */}</div>;
};

export default RegisterPage;
