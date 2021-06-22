import { Button, Typography, CircularProgress } from "@material-ui/core";
import { useStyles } from "../AdminCourseEditStyles";
import { Faculty } from "../../../../../SharedObjects/faculty";

interface SelectFacultyProps {
  faculties: Faculty[];
  onSelect: (id: any) => void;
}

const SelectFaculty: React.FC<SelectFacultyProps> = ({
  faculties,
  onSelect,
}) => {
  const classes = useStyles();
  if (faculties.length === 0) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress color="primary" />
      </div>
    );
  }
  return (
    <div className={classes.selectFacultyContainer}>
      <Typography variant="h6">Select faculty:</Typography>
      {faculties.map((item) => {
        return (
          <Button
            key={item._id}
            className={classes.facultySelectionItem}
            onClick={() => onSelect(item._id)}
          >
            {item.facultyName}
          </Button>
        );
      })}
    </div>
  );
};

export default SelectFaculty;
