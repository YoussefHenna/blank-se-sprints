import ScheduleSearch from './ScheduleSearch'
import * as api from "./AdminCreateScheduleRequests";
import { useHistory } from "react-router-dom";
import { useStyles } from "./AdminCreateScheduleStyles";
import * as AdminCourseEditStyles from "./../AdminCourseEdit/AdminCourseEditStyles";
import {Fab,Tab,Tabs} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const AdminCreateSchedulePage: React.FC = () => {
  const adminCourseEditClasses = AdminCourseEditStyles.useStyles();

  const history = useHistory();
  //Use this to navigate to different screens
  //Example: history.replace("/student/schedule") to navigate to student schedule page

  //Use like this <div className={classes.whateverStyle}/>
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <h1>Search for Schedules</h1>
      <ScheduleSearch classes={classes}/>
      <Fab
        color="primary"
        variant="extended"
        className={adminCourseEditClasses.addCourseFab}
      >
        <AddIcon />
        add new sessions
      </Fab>
    </div>
  );
};

export default AdminCreateSchedulePage;
