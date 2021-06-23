import * as api from "./RegisterRequests";
import { useHistory } from "react-router-dom";
import { useStyles } from "./RegisterStyles";

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = (props) => {
  const history = useHistory();
  //Use this to navigate to different screens
  //Example: history.replace("/student/schedule") to navigate to student schedule page

  //Use like this <div className={classes.whateverStyle}/>
  const classes = useStyles();

  return <div>{/** Put ui elements here */}</div>;
};

export default RegisterPage;
