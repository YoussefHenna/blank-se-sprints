import * as api from "./AdminCourseEditRequests";
import SelectFaculty from "./components/SelectFaculty";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import ViewCourses from "./components/ViewCourses";
import AddCourse, { CurrentInputData } from "./components/AddCourse";
import { useStyles } from "./AdminCourseEditStyles";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";

const AdminCourseEditPage: React.FC = () => {
  const history = useHistory();
  const [currentVisible, setCurrentVisible] =
    useState<"select_faculty" | "view_courses" | "add_course">(
      "select_faculty"
    );
  const [prevVisible, setPrevVisible] =
    useState<"select_faculty" | "view_courses" | "add_course">(
      "select_faculty"
    );

  const [preSetUpdateCourse, setPreSetUpdateCourse] =
    useState<CurrentInputData | undefined>(undefined);

  const classes = useStyles();

  return (
    <div className={classes.fullScreenContainer}>
      {currentVisible === "select_faculty" && (
        <SelectFaculty
          faculties={[
            { id: 0, name: "Informatics and Computer Science" },
            { id: 1, name: "Business & Administration" },
            { id: 2, name: "Applied Arts & Design" },
          ]}
          onSelect={(id: any) => {
            setCurrentVisible("view_courses");
          }}
        />
      )}

      {currentVisible === "view_courses" && (
        <ViewCourses
          onBackPressed={() => {
            setCurrentVisible("select_faculty");
          }}
          onEditCoursePressed={(item) => {
            setPrevVisible("view_courses");
            setPreSetUpdateCourse(item);
            setCurrentVisible("add_course");
          }}
        />
      )}
      {currentVisible === "add_course" && (
        <AddCourse
          onBackPressed={() => {
            setCurrentVisible(prevVisible);
          }}
          backMsg={
            prevVisible === "select_faculty" ? "Select faculty" : "Courses"
          }
          initData={preSetUpdateCourse}
          faculties={[
            { id: 0, name: "Informatics and Computer Science" },
            { id: 1, name: "Business & Administration" },
            { id: 2, name: "Applied Arts & Design" },
          ]}
        />
      )}
      {currentVisible !== "add_course" && (
        <Fab
          className={classes.addCourseFab}
          color="primary"
          variant="extended"
          onClick={() => {
            setPreSetUpdateCourse(undefined);
            setPrevVisible(currentVisible);
            setCurrentVisible("add_course");
          }}
        >
          <AddIcon />
          Add course
        </Fab>
      )}
    </div>
  );
};

export default AdminCourseEditPage;
