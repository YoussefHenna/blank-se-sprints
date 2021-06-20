import { Button, Typography } from "@material-ui/core";
import { useStyles } from "../AdminCourseEditStyles";

export interface FacultyItem {
  id: any;
  name: string;
}
interface SelectFacultyProps {
  faculties: FacultyItem[];
  onSelect: (id: any) => void;
}

const SelectFaculty: React.FC<SelectFacultyProps> = ({
  faculties,
  onSelect,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.selectFacultyContainer}>
      <Typography variant="h6">Select faculty:</Typography>
      {faculties.map((item) => {
        return (
          <Button
            className={classes.facultySelectionItem}
            onClick={() => onSelect(item.id)}
          >
            {item.name}
          </Button>
        );
      })}
    </div>
  );
};

export default SelectFaculty;
