import * as api from "./GradesRequests";

import { useHistory } from "react-router-dom";
import { useStyles } from "./GradesStyles";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import u from "updeep";

import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FaceIcon from '@material-ui/icons/Face';
import { SettingsSystemDaydreamRounded } from '@material-ui/icons';

interface IData {
  grades: {
    name: string;
    GPA: string;
  }[];
  student: {
    name: string;
    studentId: string;
    faculty: string;
  };
}

interface IPageContext {
  classes: { [key: string]: string };
  data: IData;
  isEditing: boolean;
  isTA: boolean;
  states: {
    [key: string]: [any, any];
  };
}

// prettier-ignore
const GPAs = [
  "A+", "A", "A-", "B+", "B", "B-",
  "C+", "C", "C-", "D+", "D", "F"
];

const GradesPageContext = createContext<IPageContext>(null);

const StudentData = () => {
  const {
    data: { student },
    classes,
  } = useContext(GradesPageContext);
  return (
    <>
      <h1>Student Data</h1>
      <table className={classes.studentDataTable}>
        <tr>
          <td>
            <span className={classes.studentDataProp}>Name</span>
          </td>
          <td>
            <span className={classes.studentDataValue}>{student.name}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span className={classes.studentDataProp}>Student Id</span>
          </td>
          <td>
            <span className={classes.studentDataValue}>
              {student.studentId}
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <span className={classes.studentDataProp}>Faculty</span>
          </td>
          <td>
            <span className={classes.studentDataValue}>{student.faculty}</span>
          </td>
        </tr>
      </table>
    </>
  );
};

const StudentGrades = () => {
  const {
    data: { grades },
    classes,
  } = useContext(GradesPageContext);
  return (
    <>
      <h1 style={{ marginTop: "2em" }}>Student Grades</h1>
      <div className={classes.gradesContainer}>
        {grades.map((grade, index) => (
          <Grade key={index} grade={grade} index={index} />
        ))}
      </div>
    </>
  );
};

const Grade = ({ grade, index }) => {
  const {
    isEditing,
    classes,
    states: {
      newData: [newData, setNewData],
    },
  } = useContext(GradesPageContext);
  const [GPA, setGPA] = useState(grade.GPA);
  return (
    <div className={classes.grade}>
      <span className={classes.gradeSubjectName}>{grade.name}</span>
      {(isEditing && (
        <TextField
          className={classes.gradeGPAInput}
          select
          variant='filled'
          label={grade.GPA} // to be always the old value
          value={GPA}
          onChange={(event) => {
            const newGPA = event.target.value;
            const newNewData = u(
              { grades: { [index]: { GPA: newGPA } } }, // update at the `index`
              newData
            );
            console.log(newNewData);
            setGPA(newGPA);
            setNewData(newNewData);
          }}
        >
          {GPAs.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </TextField>
      )) || <span className={classes.gradeGPA}>{grade.GPA}</span>}
    </div>
  );
};

const GradesPage: React.FC<{ isTA: boolean }> = ({ isTA }) => {
  const history = useHistory();

  const [studentId, setStudentId] = useState<string>('asd'); // TODO
  const [data, setData] = useState<IData>();
  // that will be edited if the TA wants
  const [newData, setNewData] = useState<IData>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    api.getGrades({ studentId }).then((data) => {
      setData(data);
      setNewData(data);
      setIsLoaded(true);
    });
  }, [studentId]);

  const classes = useStyles();

  const editingButtons = (
    <>
      <Button
        startIcon={<SaveIcon />}
        variant='contained'
        onClick={async () => {
          await api.updateGrades(newData);
        }}
      >
        Save
      </Button>
      <Button color='primary' onClick={() => setIsEditing(false)}>
        Cancel
      </Button>
    </>
  );

  const notEditingButton = (
    <ButtonGroup>
      <Button
        // variant='contained'
        startIcon={<FaceIcon />}
        onClick={()=>{
          let id = prompt("Enter the new student id (leave empty to cancel): ");
          id && setStudentId(id);
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

  return (
    <GradesPageContext.Provider
      value={{
        classes,
        data,
        isEditing,
        isTA,
        states: {
          data: [data, setData],
          newData: [newData, setNewData],
          isEditing: [isEditing, setIsEditing],
          isLoaded: [isLoaded, setIsLoaded],
          studentId: [studentId, setStudentId],
        },
      }}
    >
      {(isLoaded && (
        <div>
          <StudentData />
          <StudentGrades />
          {/* editing buttons */}
          {isTA && (
            <section className={classes.TAEditButtons}>
              {(isEditing && editingButtons) || notEditingButton}
            </section>
          )}
        </div>
      )) || (
        <div
          style={{
            height: "100vh",
            display: "grid",
            placeItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </GradesPageContext.Provider>
  );
};

export default GradesPage;
