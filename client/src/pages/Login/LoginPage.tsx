import * as api from "./LoginRequests";
import { useHistory } from "react-router-dom";
import { useStyles } from "./LoginStyles";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = (props) => {
  const history = useHistory();
  //Use this to navigate to different screens
  //Example: history.replace("/student/schedule") to navigate to student schedule page

  //Use like this <div className={classes.whateverStyle}/>
  const classes = useStyles();

  return <div>{/** Put ui elements here */}</div>;
};

export default LoginPage;
