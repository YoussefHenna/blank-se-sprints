import {
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useStyles } from "../AdminCourseEditStyles";
import { FacultyItem } from "./SelectFaculty";
import BackIcon from "@material-ui/icons/ArrowBackIos";
import { useState } from "react";

export interface CurrentInputData {
  name: string;
  description: string;
  credits: number;
  faculty: any;
  id?: any;
}
interface AddCourseProps {
  faculties: FacultyItem[];
  onBackPressed: () => void;
  backMsg: string;
  initData?: CurrentInputData;
}

const AddCourse: React.FC<AddCourseProps> = (props) => {
  const classes = useStyles();
  const [currentInput, setCurrentInput] = useState<CurrentInputData>(
    props.initData
      ? props.initData
      : {
          name: "",
          description: "",
          credits: -1,
          faculty: props.faculties[0].id,
        }
  );
  const isUpdate = !!props.initData;
  return (
    <div className={classes.addCourseContainer}>
      <Button
        startIcon={<BackIcon />}
        color="primary"
        onClick={() => props.onBackPressed()}
      >
        {props.backMsg}
      </Button>

      <Typography className={classes.coursesTitle} variant="h6">
        {isUpdate ? "Update course" : "Add course"}
      </Typography>

      <div className={classes.addCourseInputsContainer}>
        <TextField
          key="code"
          className={classes.addCourseInputItem}
          label="Code"
          placeholder="CSEN102"
          variant="outlined"
          value={currentInput.name}
          onChange={(event) =>
            setCurrentInput({ ...currentInput, name: event.target.value })
          }
        />
        <TextField
          key="name"
          className={classes.addCourseInputItem}
          label="Name"
          placeholder="Introduction to Computer Science"
          variant="outlined"
          value={currentInput.description}
          onChange={(event) =>
            setCurrentInput({
              ...currentInput,
              description: event.target.value,
            })
          }
        />
        <TextField
          key="credits"
          className={classes.addCourseInputItem}
          label="Credits"
          type="number"
          placeholder="5"
          variant="outlined"
          value={currentInput.credits === -1 ? undefined : currentInput.credits}
          onChange={(event) => {
            const asNum = +event.target.value;
            if (!isNaN(asNum) && asNum > 0) {
              setCurrentInput({
                ...currentInput,
                credits: asNum,
              });
            } else {
              setCurrentInput({
                ...currentInput,
                credits: -1,
              });
            }
          }}
        />
        <FormControl
          key="faculty"
          variant="outlined"
          className={classes.addCourseInputItem}
        >
          <InputLabel>Faculty</InputLabel>
          <Select
            label="Faculty"
            value={currentInput.faculty}
            onChange={(event) =>
              setCurrentInput({
                ...currentInput,
                faculty: event.target.value,
              })
            }
          >
            {props.faculties.map((item) => {
              return <MenuItem value={item.id}>{item.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <Button
          className={classes.submitCourseButton}
          variant="contained"
          color="primary"
        >
          {isUpdate ? "Update" : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default AddCourse;
