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

  const [curr, setCurr] = React.useState<"Search Schedules" | "Edit Schedule" |"Add Sessions">(
    "Search Schedules"
  );
  const [prev, setPrev] = React.useState<"Search Schedules"|"Edit Schedule"|"Add Sessions">(
    "Search Schedules"
  )

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
          selectedId={selectedId} //dummy data
        />
      )}
      <Fab
        color="primary"
        variant="extended"
        className={adminCourseEditClasses.addCourseFab}
onClick={()=>{
          setPrev(curr)
          setCurr("Add Sessions")
        }}
      >
        <AddIcon />
        add new sessions
      </Fab>
      {curr==='Add Sessions' && (

        <AddSession onBackPressed={()=>{

          setPrev(curr)
          setCurr(prev)

        }} backMsg={prev}/>
      )}

    </div>
  );
};

export default AdminCreateSchedulePage;
