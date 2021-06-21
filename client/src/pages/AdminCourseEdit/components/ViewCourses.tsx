import { Typography, IconButton, Button, ButtonBase } from "@material-ui/core";
import { useStyles } from "../AdminCourseEditStyles";
import EditIcon from "@material-ui/icons/Edit";
import BackIcon from "@material-ui/icons/ArrowBackIos";
import DeleteIcon from "@material-ui/icons/Delete";
import { CurrentInputData } from "./AddCourse";

interface CourseItemProps {
  name: string;
  description: string;
  color: string;
  credits: number;
  id: any;
  faculty: any;
  onEditCoursePressed: (data: CurrentInputData) => void;
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
        <IconButton className={classes.courseIconButton}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

interface ViewCoursesProps {
  onBackPressed: () => void;
  onEditCoursePressed: (data: CurrentInputData) => void;
}

const ViewCourses: React.FC<ViewCoursesProps> = ({
  onBackPressed,
  onEditCoursePressed,
}) => {
  const classes = useStyles();
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
        {"Informatics & Computer Science Courses"}
      </Typography>
      <div className={classes.courseItemsContainer}>
        <CourseItem
          name="CSEN 104"
          description="Introduction to Computer Science"
          id={0}
          color={"rgba(0,0,0)"}
          faculty={1}
          credits={5}
          onEditCoursePressed={onEditCoursePressed}
        />
        <CourseItem
          name="CSEN 104"
          description="Introduction to Computer Science"
          id={0}
          color={"rgba(0,0,0)"}
          faculty={1}
          credits={5}
          onEditCoursePressed={onEditCoursePressed}
        />
        <CourseItem
          name="CSEN 104"
          description="Introduction to Computer Science"
          id={0}
          color={"rgba(0,0,0)"}
          faculty={1}
          credits={5}
          onEditCoursePressed={onEditCoursePressed}
        />
        <CourseItem
          name="CSEN 104"
          description="Introduction to Computer Science"
          id={0}
          color={"rgba(0,0,0)"}
          faculty={1}
          credits={5}
          onEditCoursePressed={onEditCoursePressed}
        />
      </div>
    </div>
  );
};

export default ViewCourses;
