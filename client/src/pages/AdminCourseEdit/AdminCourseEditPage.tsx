import * as api from "./AdminCourseEditRequests";
import SelectFaculty from "./components/SelectFaculty";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import ViewCourses from "./components/ViewCourses";
import { useStyles } from "./AdminCourseEditStyles";

const AdminCourseEditPage: React.FC = () => {
  const history = useHistory();
  const [currentVisible, setCurrentVisible] =
    useState<"select_faculty" | "view_courses" | "add_course">(
      "select_faculty"
    );
  const classes = useStyles();

  return (
    <div className={classes.fullScreenContainer}>
      {currentVisible === "select_faculty" && (
        <SelectFaculty
          faculties={[
            { id: 0, name: "Informatics and Computer Science" },
            { id: 0, name: "Business & Administration" },
            { id: 0, name: "Applied Arts & Design" },
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
        />
      )}
    </div>
  );
};

export default AdminCourseEditPage;
