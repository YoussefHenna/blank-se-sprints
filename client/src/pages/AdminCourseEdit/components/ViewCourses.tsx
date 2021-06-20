import { Typography, IconButton, Button, ButtonBase } from "@material-ui/core";
import { useStyles } from "../AdminCourseEditStyles";
import EditIcon from "@material-ui/icons/Edit";
import BackIcon from "@material-ui/icons/ArrowBackIos";
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
    <ButtonBase
      className={classes.courseItem}
      style={{ backgroundColor: props.color }}
    >
      <Typography className={classes.courseItemTitle}>{props.name}</Typography>
      <Typography className={classes.courseItemDesc}>
        {props.description}
      </Typography>
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
        className={classes.courseEditButton}
      >
        <EditIcon />
      </IconButton>
    </ButtonBase>
  );
};

function generateDarkColorRgb() {
  const red = Math.floor((Math.random() * 256) / 2);
  const green = Math.floor((Math.random() * 256) / 2);
  const blue = Math.floor((Math.random() * 256) / 2);
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}

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
          color={generateDarkColorRgb()}
          faculty={1}
          credits={5}
          onEditCoursePressed={onEditCoursePressed}
        />
        <CourseItem
          name="CSEN 104"
          description="Introduction to Computer Science"
          id={0}
          color={generateDarkColorRgb()}
          faculty={1}
          credits={5}
          onEditCoursePressed={onEditCoursePressed}
        />
        <CourseItem
          name="CSEN 104"
          description="Introduction to Computer Science"
          id={0}
          color={generateDarkColorRgb()}
          faculty={1}
          credits={5}
          onEditCoursePressed={onEditCoursePressed}
        />
        <CourseItem
          name="CSEN 104"
          description="Introduction to Computer Science"
          id={0}
          color={generateDarkColorRgb()}
          faculty={1}
          credits={5}
          onEditCoursePressed={onEditCoursePressed}
        />
      </div>
    </div>
  );
};

export default ViewCourses;
