import {
  Typography,
  IconButton,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useStyles } from "../AdminCourseEditStyles";
import EditIcon from "@material-ui/icons/Edit";
import BackIcon from "@material-ui/icons/ArrowBackIos";
import DeleteIcon from "@material-ui/icons/Delete";
import { CurrentInputData } from "./AddCourse";
import { getCourses, deleteCourse } from "../AdminCourseEditRequests";
import { useState } from "react";
import { Course } from "../../../SharedObjects/course";
import { useEffect } from "react";
import { Faculty } from "../../../SharedObjects/faculty";
import ErrorDialog, { ErrorDialogProps } from "../../../components/ErrorDialog";
import DeleteDialog, {
  DeleteDialogProps,
} from "../components/DeleteConfirmationDialog";
import { useHistory } from "react-router-dom";

interface CourseItemProps {
  name: string;
  description: string;
  color: string;
  credits: number;
  id: any;
  faculty: any;
  onEditCoursePressed: (data: CurrentInputData) => void;
  onDeleteClicked: (id: string) => void;
}
const CourseItem: React.FC<CourseItemProps> = (props) => {
  const classes = useStyles();

  return (
    <div
      className={classes.courseItem}
      style={{ backgroundColor: props.color }}
    >
      <Typography className={classes.courseItemTitle}>{props.name}</Typography>
      <Typography className={classes.courseItemDesc}>
        {props.description}
      </Typography>
      <div className={classes.courseButtonsContainer}>
        <IconButton
          onClick={() => {
            props.onEditCoursePressed({
              description: props.description,
              name: props.name,
              faculty: props.faculty,
              credits: props.credits,
              id: props.id,
            });
          }}
          className={classes.courseIconButton}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            props.onDeleteClicked(props.id);
          }}
          className={classes.courseIconButton}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

interface ViewCoursesProps {
  onBackPressed: () => void;
  onEditCoursePressed: (data: CurrentInputData) => void;
  faculty: Faculty | undefined;
  showSnackbar: (msg: string) => void;
}

const ViewCourses: React.FC<ViewCoursesProps> = ({
  onBackPressed,
  onEditCoursePressed,
  showSnackbar,
  faculty,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorDialogState, setErrorDialogState] = useState<ErrorDialogProps>({
    open: false,
    onClose: () => {},
    title: "",
    content: "",
  });
  const [deleteDialogState, setDeleteDialogState] = useState<DeleteDialogProps>(
    {
      open: false,
      onClose: () => {},
      onConfirmDelete: () => {},
    }
  );
  const [courses, setCourses] = useState<Course[]>([]);

  const dismissErrorDialog = () => {
    setErrorDialogState({
      open: false,
      onClose: () => {},
      title: "",
      content: "",
    });
    loadCourses();
  };

  const dimissDeleteDialog = () => {
    setDeleteDialogState({
      open: false,
      onClose: () => {},
      onConfirmDelete: () => {},
    });
  };

  const deleteSelectedCourse = (id: string) => {
    setIsLoading(true);
    deleteCourse(id).then(
      (value) => {
        setIsLoading(false);
        showSnackbar("Course deleted successfully");
        loadCourses();
      },
      (err) => {
        setIsLoading(false);
        setErrorDialogState({
          open: true,
          onClose: dismissErrorDialog,
          title: "Delete course failed",
          content: err.error
            ? err.error
            : "Unknown error occured while loading courses, dismiss to try again",
        });
      }
    );
  };
  const loadCourses = () => {
    setIsLoading(true);
    setCourses([]);
    if (faculty) {
      getCourses(faculty._id).then(
        (value) => {
          setIsLoading(false);
          setCourses(value);
        },
        (err) => {
          setIsLoading(false);
          setErrorDialogState({
            open: true,
            onClose: dismissErrorDialog,
            title: "Loading courses failed",
            content: err.error
              ? err.error
              : "Unknown error occured while loading courses, dismiss to try again",
          });
        }
      );
    } else {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadCourses();
  }, [faculty]);
  const classes = useStyles();

  if (isLoading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress color="primary" />
      </div>
    );
  }

  return (
    <div className={classes.viewCoursesContainer}>
      <Button
        startIcon={<BackIcon />}
        color="primary"
        onClick={() => onBackPressed()}
      >
        Select faculty
      </Button>

      <Typography className={classes.coursesTitle} variant="h6">
        {!!faculty ? faculty.facultyName + " Courses" : ""}
      </Typography>
      {courses.length === 0 && (
        <div className={classes.loadingContainer}>
          <Typography>No courses</Typography>
        </div>
      )}
      <div className={classes.courseItemsContainer}>
        {courses.map((item) => {
          return (
            <CourseItem
              name={item.name}
              description={item.description}
              id={item._id}
              faculty={item.faculty}
              credits={item.credits}
              color={item.color}
              onEditCoursePressed={onEditCoursePressed}
              onDeleteClicked={(id) => {
                setDeleteDialogState({
                  open: true,
                  onClose: dimissDeleteDialog,
                  onConfirmDelete: () => {
                    deleteSelectedCourse(id);
                  },
                });
              }}
            />
          );
        })}
      </div>
      <ErrorDialog {...errorDialogState} />
      <DeleteDialog {...deleteDialogState} />
    </div>
  );
};

export default ViewCourses;
