import ScheduleSearch from "./components/ScheduleSearch";
import * as api from "./AdminCreateScheduleRequests";
import { useHistory } from "react-router-dom";
import { useStyles } from "./AdminCreateScheduleStyles";
import * as AdminCourseEditStyles from "./../AdminCourseEdit/AdminCourseEditStyles";
import { Fab, Tab, Tabs } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import ScheduleEdit from "./components/ScheduleEdit";
import AddSession from "./components/AddSession";

const AdminCreateSchedulePage: React.FC = () => {
  const adminCourseEditClasses = AdminCourseEditStyles.useStyles();

  const [curr, setCurr] = React.useState<
    "Add Sessions" | "Search Schedules" | "Edit Schedule"
  >("Search Schedules");
  const [prev, setPrev] = React.useState<
    "Add Sessions" | "Search Schedules" | "Edit Schedule"
  >("Search Schedules");
  const [selectedId, setSelectedId] = React.useState<string>("");
  const [scheduleType, setScheduleType] = React.useState<
    "StudentGroup" | "Instructor"
  >("StudentGroup");

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
          handleIdSelect={(id, scheduleType) => {
            setSelectedId(id);
            setScheduleType(scheduleType);
            setCurr("Edit Schedule");
            setPrev(curr);
          }}
        />
      )}
      {curr === "Edit Schedule" && (
        <ScheduleEdit
          backMsg={prev}
          onBackPressed={() => {
            setCurr(prev);
            setPrev(curr);
          }}
          selectedId={selectedId} //dummy data
          scheduleType={scheduleType}
        />
      )}
      {curr === "Add Sessions" && (
        <AddSession
          backMsg={prev}
          onBackPressed={() => {
            setCurr(prev);
            setPrev(curr);
          }}
        />
      )}
      <Fab
        color="primary"
        variant="extended"
        className={adminCourseEditClasses.addCourseFab}
        onClick={() => {
          console.log("blikk!");
          setCurr("Add Sessions");
          setPrev(curr);
        }}
      >
        <AddIcon />
        add new sessions
      </Fab>
    </div>
  );
};

export default AdminCreateSchedulePage;
