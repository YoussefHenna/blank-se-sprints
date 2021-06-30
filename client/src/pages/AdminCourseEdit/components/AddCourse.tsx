import {
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";
import { useStyles } from "../AdminCourseEditStyles";
import BackIcon from "@material-ui/icons/ArrowBackIos";
import { Faculty } from "../../../../SharedObjects/faculty";
import { useState, useEffect } from "react";
import { addCourse, updateCourse } from "../AdminCourseEditRequests";
import ErrorDialog, { ErrorDialogProps } from "../../../components/ErrorDialog";

export interface CurrentInputData {
  name: string;
  description: string;
  credits: number;
  faculty: any;
  id?: any;
}
interface AddCourseProps {
  faculties: Faculty[];
  onBackPressed: () => void;
  backMsg: string;
  showSnackbar: (msg: string) => void;
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
          faculty: props.faculties[0]._id,
        }
  );

  const [isLoading, setIsLoading] = useState(false);
  const [errorDialogState, setErrorDialogState] = useState<ErrorDialogProps>({
    open: false,
    onClose: () => {},
    title: "",
    content: "",
  });

  const validateData = (): boolean => {
    const result =
      !!currentInput.name &&
      currentInput.name.length > 0 &&
      !!currentInput.description &&
      currentInput.description.length > 0 &&
      currentInput.credits > 0;
    if (!result) {
      setErrorDialogState({
        open: true,
        onClose: dismissErrorDialog,
        title: "Some fields are empty",
        content: "Please verify that all fields are filled in and not empty",
      });
    }
    return result;
  };

  const dismissErrorDialog = () => {
    setErrorDialogState({
      open: false,
      onClose: () => {},
      title: "",
      content: "",
    });
  };

  const addNewCourse = () => {
    if (!validateData()) {
      return;
    }
    setIsLoading(true);
    addCourse({ ...currentInput, color: "", _id: "" }).then(
      (value) => {
        setIsLoading(false);
        props.showSnackbar("Course added successfully");
        props.onBackPressed();
      },
      (err) => {
        setIsLoading(false);
        setErrorDialogState({
          open: true,
          onClose: dismissErrorDialog,
          title: "Add course failed",
          content: err.error
            ? err.error
            : "Unknown error occured while adding course, please try again",
        });
      }
    );
  };

  const updateCurrentCourse = () => {
    if (!validateData()) {
      return;
    }
    setIsLoading(true);
    updateCourse(currentInput.id, { ...currentInput, color: "", _id: "" }).then(
      (value) => {
        setIsLoading(false);
        props.showSnackbar("Course updated successfully");
        props.onBackPressed();
      },
      (err) => {
        setIsLoading(false);
        setErrorDialogState({
          open: true,
          onClose: dismissErrorDialog,
          title: "Update course failed",
          content: err.error
            ? err.error
            : "Unknown error occured while updating course, please try again",
        });
      }
    );
  };

  const isUpdate = !!props.initData;

  if (isLoading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress color="primary" />
      </div>
    );
  }

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
              return <MenuItem value={item._id}>{item.facultyName}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <Button
          className={classes.submitCourseButton}
          variant="contained"
          color="primary"
          onClick={() => {
            if (isUpdate) {
              updateCurrentCourse();
            } else {
              addNewCourse();
            }
          }}
        >
          {isUpdate ? "Update" : "Submit"}
        </Button>
      </div>
      <ErrorDialog {...errorDialogState} />
    </div>
  );
};

export default AddCourse;
