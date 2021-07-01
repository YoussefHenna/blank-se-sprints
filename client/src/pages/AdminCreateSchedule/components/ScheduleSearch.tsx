import { Instructor, StudentGroup } from "../../../SharedObjects/users";
import {
  Container,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  FormControl,
  FormHelperText,
  Button,
} from "@material-ui/core/";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
import * as api from "../AdminCreateScheduleRequests";
import StudentGroupSelectTable from "./StudentGroupSelectTable";

interface Props {
  classes: ClassNameMap;
  //  steps : string[];
  //  setSteps : React.Dispatch<React.SetStateAction<string[]>>
  handleIdSelect: (id: string) => void;
}

const studentGroupSearch = (
  setStudentGroupQueryString: React.Dispatch<React.SetStateAction<string>>,
  handleStudentGroupSearch: React.Dispatch<React.SetStateAction<boolean>>,
  classes: ClassNameMap
) => (
  <FormControl className={classes.formComponent}>
    <TextField
      id="admin-schedule-student-group-search"
      label="search student group"
      onChange={(e) => setStudentGroupQueryString(e.target.value)}
    />
    <FormHelperText>e.g. computer science, 2019</FormHelperText>
    <Button
      variant="contained"
      color="primary"
      onClick={() => handleStudentGroupSearch(true)}
    >
      search
    </Button>
  </FormControl>
);

const scheduleTypeSelect = (
  setterFunc: React.Dispatch<React.SetStateAction<string>>,
  classes: ClassNameMap
) => (
  <div className={classes.formComponent}>
    <FormLabel>select schedule type</FormLabel>
    <RadioGroup onChange={(e) => setterFunc(e.target.value)}>
      <FormControlLabel
        label="Student Group"
        value="studentGroup"
        control={<Radio />}
      ></FormControlLabel>
      <FormControlLabel
        label="Instructor"
        value="instructor"
        control={<Radio />}
      ></FormControlLabel>
    </RadioGroup>
  </div>
);

const instructorSelect = (
  instructors: Instructor[] | undefined,
  setterFunc: React.Dispatch<React.SetStateAction<Instructor | undefined>>,
  classes: ClassNameMap
) => (
  <FormControl className={classes.formComponent}>
    <Autocomplete
      id="admin-schedule-instructor-select"
      options={instructors}
      getOptionLabel={(option: Instructor) =>
        `${option.firstName} ${option.lastName} `
      }
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Select instructor" variant="outlined" />
      )}
    />
  </FormControl>
);

const ScheduleSearch: React.FC<Props> = (props: Props) => {
  const [selectedType, setSelectedType] = useState<string>("studentGroup");
  const [studentGroupQueryString, setStudentGroupQueryString] =
    React.useState<string>("");
  const [instructors, setInstructors] = React.useState<
    Instructor[] | undefined
  >();
  const [studentGroups, setStudentGroups] = React.useState<
    StudentGroup[] | undefined
  >();

  const [selectedInstructor, setSelectedInstructor] = React.useState<
    Instructor | undefined
  >();

  const [handleStudentGroupSearch, setHandleStudentGroupSearch] =
    React.useState<boolean>(false);

  const [studentGroupLoadInProgress, setStudentGroupLoadInProgress] =
    React.useState<any>();
  React.useState<any>();

  React.useEffect(() => {
    console.log("ping!");
    const fetchData = async () => {
      if (!instructors) setInstructors(await api.getInstructors());
    };
    fetchData();
    console.log(instructors);
  }, [instructors]);

  React.useEffect(() => {
    if (handleStudentGroupSearch) {
      let data: StudentGroup[];
      const fetchData = async () => {
        setStudentGroupLoadInProgress(true);
        data = await api.getStudentGroups(studentGroupQueryString);
        setStudentGroups(data);
        setStudentGroupLoadInProgress(false);
      };
      fetchData();
    }
    setHandleStudentGroupSearch(false);
  }, [studentGroupQueryString, handleStudentGroupSearch]);

  return (
    <Container maxWidth="xl">
      <h1>Search for Schedules</h1>
      {scheduleTypeSelect(setSelectedType, props.classes)}
      {selectedType === "instructor" &&
        instructors &&
        instructorSelect(instructors, setSelectedInstructor, props.classes)}
      {selectedType === "studentGroup" &&
        studentGroupSearch(
          setStudentGroupQueryString,
          setHandleStudentGroupSearch,
          props.classes
        )}
      {selectedType === "studentGroup" && (
        <StudentGroupSelectTable
          handleIdSelect={props.handleIdSelect}
          data={studentGroups ? studentGroups : []}
          isLoading={studentGroupLoadInProgress}
        />
      )}
    </Container>
  );
};

export default ScheduleSearch;
