import { Typography } from "@material-ui/core";
import { useStyles } from "../AdminCourseEditStyles";

interface ViewCoursesProps {
  onBackPressed: () => void;
}

const ViewCourses: React.FC<ViewCoursesProps> = () => {
  const classes = useStyles();
  return (
    <div className={classes.viewCoursesContainer}>
      <Typography variant="h6">
        {"Informatics & Computer Science Courses"}
      </Typography>
    </div>
  );
};

interface CourseItemProps {
  name: string;
  description: string;
  id: any;
}
const CourseItem: React.FC<CourseItemProps> = (props) => {
  return <div></div>;
};

export default ViewCourses;
