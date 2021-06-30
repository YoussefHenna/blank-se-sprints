import SelectFaculty from "./components/SelectFaculty";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import ViewCourses from "./components/ViewCourses";
import AddCourse, { CurrentInputData } from "./components/AddCourse";
import { useStyles } from "./AdminCourseEditStyles";
import AddIcon from "@material-ui/icons/Add";
import { Fab, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { getFaculties } from "./AdminCourseEditRequests";
import { Faculty } from "../../../SharedObjects/faculty";
import ErrorDialog, { ErrorDialogProps } from "../../components/ErrorDialog";

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AdminCourseEditPage: React.FC = () => {
  const history = useHistory();
  const [currentVisible, setCurrentVisible] = useState<
    "select_faculty" | "view_courses" | "add_course"
  >("select_faculty");
  const [prevVisible, setPrevVisible] = useState<
    "select_faculty" | "view_courses" | "add_course"
  >("select_faculty");

  const [preSetUpdateCourse, setPreSetUpdateCourse] = useState<
    CurrentInputData | undefined
  >(undefined);

  const [snackbarState, setSnackbarState] = useState<{
    open: boolean;
    message: string;
  }>({ open: false, message: "" });

  const [errorDialogState, setErrorDialogState] = useState<ErrorDialogProps>({
    open: false,
    onClose: () => {},
    title: "",
    content: "",
  });

  const showSnackBar = (msg: string) => {
    setSnackbarState({ open: true, message: msg });
  };

  const dismissErrorDialog = () => {
    setErrorDialogState({
      open: false,
      onClose: () => {},
      title: "",
      content: "",
    });
    loadFaculties();
  };

  const loadFaculties = () => {
    getFaculties().then(
      (value) => {
        setFaculties(value);
      },
      (err) => {
        setErrorDialogState({
          open: true,
          onClose: dismissErrorDialog,
          title: "Loading faculties failed",
          content: err.error
            ? err.error
            : "Unknown error occured while loading faculties, dismiss to try again",
        });
      }
    );
  };

  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [currentFaculty, setCurrentFaculty] = useState<Faculty | undefined>(
    undefined
  );
  useEffect(() => {
    loadFaculties();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.fullScreenContainer}>
      {currentVisible === "select_faculty" && (
        <SelectFaculty
          faculties={faculties}
          onSelect={(id: any) => {
            setCurrentFaculty(faculties.find((value) => value._id == id));
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
          faculty={currentFaculty}
          showSnackbar={showSnackBar}
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
          faculties={faculties}
          showSnackbar={showSnackBar}
        />
      )}
      {currentVisible !== "add_course" && faculties.length > 0 && (
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
      )}{" "}
      <ErrorDialog {...errorDialogState} />
      <Snackbar
        open={snackbarState.open}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        autoHideDuration={3000}
        onClose={() => {
          setSnackbarState({ open: false, message: "" });
        }}
      >
        <Alert
          onClose={() => {
            setSnackbarState({ open: false, message: "" });
          }}
          severity="success"
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminCourseEditPage;
