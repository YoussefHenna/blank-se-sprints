import * as api from "./AdminCreateScheduleRequests";
import { useHistory } from "react-router-dom";
import { useStyles } from "./AdminCreateScheduleStyles";

const AdminCreateSchedulePage: React.FC = () => {
  const history = useHistory();
  //Use this to navigate to different screens
  //Example: history.replace("/student/schedule") to navigate to student schedule page

  //Use like this <div className={classes.whateverStyle}/>
  const classes = useStyles();

  return <div>{/** Put ui elements here */}</div>;
};

export default AdminCreateSchedulePage;
