import * as api from "./ChangePasswordRequests";
import { useHistory } from "react-router-dom";
import { useStyles } from "./ChangePasswordStyles";

const ChangePasswordPage: React.FC = () => {
  const history = useHistory();
  //Use this to navigate to different screens
  //Example: history.replace("/student/schedule") to navigate to student schedule page

  //Use like this <div className={classes.whateverStyle}/>
  const classes = useStyles();

  return <div>{/** Put ui elements here */}</div>;
};

export default ChangePasswordPage;