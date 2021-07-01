import * as api from "./GradesRequests";
import type { IData } from "./GradesRequests";

import { useStyles } from "./GradesStyles";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import u from "updeep";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import FormControl from "@material-ui/core/FormControl";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import FaceIcon from "@material-ui/icons/Face";
import SearchIcon from "@material-ui/icons/Search";

interface IPageContext {
  classes: { [key: string]: string };
  data: IData;
  isEditing: boolean;
  isTA: boolean;
  states: {
    [key: string]: [any, any];
  };
}

const GradesPageContext = createContext<IPageContext>(null);
GradesPageContext.displayName = "Grades page context";

const StudentData = () => {
  const {
    data: { student },
    classes
  } = useContext(GradesPageContext);
  return (
    <>
      <h1>Student Data</h1>
      <TableContainer component={Paper}>
        <Table className={classes.studentDataTable}>
          <TableBody>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>{student.username}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Student name</TableCell>
              <TableCell>{student.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Faculty</TableCell>
              <TableCell>{student.faculty}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Admission year</TableCell>
              <TableCell>{student.admissionYear}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Semester</TableCell>
              <TableCell>{student.semester}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const StudentGrades = () => {
  const {
    data: { grades },
    classes,
    states: {
      updateGradesError: [updateGradesError]
    }
  } = useContext(GradesPageContext);
  return (
    <>
      <h1 style={{ marginTop: "2em" }}>Student Grades</h1>
      {updateGradesError && <div className={classes.updateGradesError}>{updateGradesError}</div>}
      <div className={classes.gradesContainer}>
        {grades.map((grade, index) => (
          <Grade key={index} grade={grade} index={index} />
        ))}
      </div>
    </>
  );
};

interface IGradeProps {
  grade: {
    courseId: string;
    name: string;
    grade: string;
    description: string;
    credits: number;
    color: string;
  };
  index: number;
}

const Grade: React.FC<IGradeProps> = ({ grade, index }) => {
  const {
    isEditing,
    classes,
    states: {
      newData: [newData, setNewData]
    }
  } = useContext(GradesPageContext);
  let newGrade = newData.grades[index];
  return (
    <div className={classes.grade}>
      <span className={classes.gradeSubjectName}>{grade.name}</span>
      <span>{grade.description}</span>
      {(isEditing && (
        <TextField
          className={classes.gradeValueInput}
          label={grade.grade} // to be always the old value
          value={newGrade.grade}
          onChange={(event) => {
            const newNewData = u(
              { grades: { [index]: { grade: event.target.value } } }, // update at the `index`
              newData
            );
            console.log(newNewData);
            setNewData(newNewData);
          }}
        ></TextField>
      )) || <span className={classes.gradeValue}>{grade.grade}</span>}
    </div>
  );
};

const ChooseStudentForm = () => {
  const {
    classes,
    states: {
      studentUsername: [studentUsername, setStudentUsername],
      usernameFormError: [___, setUsernameFormError],
      isUsernameEntered: [_, setIsUsernameEntered],
      usernameFormError: [usernameFormError],
      isLoading: [__, setIsLoading]
    }
  } = useContext(GradesPageContext);

  return (
    <div className={classes.usernameFormContainer}>
      <FormControl>
        {/* <InputLabel htmlFor='my-input'>User name</InputLabel> */}
        <TextField
          error={!!usernameFormError}
          helperText={usernameFormError}
          label="User name"
          onChange={(event) => {
            setStudentUsername(event.target.value);
          }}
          value={studentUsername}
        ></TextField>
        <Button
          style={{ marginTop: "0.5em" }}
          startIcon={<SearchIcon />}
          onClick={() => {
            console.log("setting username:", studentUsername);
            setIsUsernameEntered(true);
            setUsernameFormError("");
            setIsLoading(true);
          }}
        >
          Search
        </Button>
      </FormControl>
    </div>
  );
};

// TODO: useReducer and dispatch to simplify handling states
const GradesPage: React.FC<{ isTA: boolean }> = ({ isTA }) => {
  const [studentUsername, setStudentUsername] = useState<string>(null); // TODO
  const [isUsernameEntered, setIsUsernameEntered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [usernameFormError, setUsernameFormError] = useState<string>();
  const [updateGradesError, setUpdateGradesError] = useState<string>();
  const [data, setData] = useState<IData>();
  // that will be edited if the TA wants
  const [newData, setNewData] = useState<IData>();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const classes = useStyles();

  useEffect(() => {
    if (isUsernameEntered) {
      console.log("fetching data:", studentUsername);
      api
        .instructorGetGrades({ studentUsername })
        .then((data: IData) => {
          setData(data);
          setNewData(data);
          setIsLoading(false);
        })
        .catch((e) => {
          setIsUsernameEntered(false);
          setIsLoading(false);
          setUsernameFormError(e.message ?? e);
        });
    } else if (!isTA) {
      api.studentGetGrades().then((data: IData) => {
        setNewData(data);
        setIsLoading(false);
        setData(data);
      });
    }
  }, [isUsernameEntered, studentUsername, isTA]);

  const editingButtons = (
    <>
      <Button
        startIcon={<SaveIcon />}
        variant="contained"
        onClick={async () => {
          try {
            setIsLoading(true);
            await api.instructorUpdateGrades(newData);
            setIsLoading(false);
            setUpdateGradesError("");
            setData(newData);
            setIsEditing(false);
          } catch (e) {
            setIsLoading(false);
            setUpdateGradesError(e.message ?? e);
          }
        }}
      >
        Save
      </Button>
      <Button
        color="primary"
        onClick={() => {
          setIsEditing(false);
          setUpdateGradesError("");
          setNewData(data);
        }}
      >
        Cancel
      </Button>
    </>
  );

  const notEditingButton = (
    <ButtonGroup>
      <Button
        // variant='contained'
        startIcon={<FaceIcon />}
        onClick={() => {
          setIsUsernameEntered(false);
        }}
      >
        Change Student
      </Button>
      <Button
        // variant='contained'
        startIcon={<EditIcon />}
        onClick={() => setIsEditing(true)}
      >
        Edit
      </Button>
    </ButtonGroup>
  );

  const contextValue: IPageContext = {
    classes,
    data,
    isEditing,
    isTA,
    states: {
      data: [data, setData],
      newData: [newData, setNewData],
      isEditing: [isEditing, setIsEditing],
      isLoading: [isLoading, setIsLoading],
      studentUsername: [studentUsername, setStudentUsername],
      isUsernameEntered: [isUsernameEntered, setIsUsernameEntered],
      usernameFormError: [usernameFormError, setUsernameFormError],
      updateGradesError: [updateGradesError, setUpdateGradesError]
    }
  };

  return (
    <GradesPageContext.Provider value={contextValue}>
      {!isUsernameEntered && isTA ? (
        <ChooseStudentForm />
      ) : (
        (!isLoading && (
          <div>
            <StudentData />
            <StudentGrades />
            {/* editing buttons */}
            {isTA && (
              <section className={classes.TAEditButtons}>{(isEditing && editingButtons) || notEditingButton}</section>
            )}
          </div>
        )) || (
          <div
            style={{
              height: "100vh",
              display: "grid",
              placeItems: "center"
            }}
          >
            <CircularProgress />
          </div>
        )
      )}
    </GradesPageContext.Provider>
  );
};

export default GradesPage;
