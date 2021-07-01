import ScheduleSearch from "./components/ScheduleSearch";
import * as api from "./AdminCreateScheduleRequests";
import { useHistory } from "react-router-dom";
import { useStyles } from "./AdminCreateScheduleStyles";
import * as AdminCourseEditStyles from "./../AdminCourseEdit/AdminCourseEditStyles";
import { Fab, Tab, Tabs } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import ScheduleEdit from "./components/ScheduleEdit";

const AdminCreateSchedulePage: React.FC = () => {
  const adminCourseEditClasses = AdminCourseEditStyles.useStyles();

  const [curr, setCurr] = React.useState<"Search Schedules" | "Edit Schedule">(
    "Search Schedules"
  );
  const [prev, setPrev] = React.useState<"Search Schedules" | "Edit Schedule">(
    "Search Schedules"
  );
  const [selectedId, setSelectedId] = React.useState<string>("");
  //  const history = useHistory();
  //Use this to navigate to different screens
  //Example: history.replace("/student/schedule") to navigate to student schedule page

  //Use like this <div className={classes.whateverStyle}/>

  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      {curr === "Search Schedules" && (
        <ScheduleSearch
          classes={classes}
          handleIdSelect={(id) => {
            setSelectedId(id);
            setCurr("Edit Schedule");
            setPrev("Search Schedules");
          }}
        />
      )}
      {curr === "Edit Schedule" && (
        <ScheduleEdit
          backMsg={"Search Schedules"}
          onBackPressed={() => {
            setCurr("Search Schedules");
            setPrev("Edit Schedule");
          }}
          selectedId={"60cc8e35111a71a2f67da393"} //dummy data
        />
      )}
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
