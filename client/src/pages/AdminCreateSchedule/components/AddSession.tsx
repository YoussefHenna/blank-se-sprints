import BackIcon from "@material-ui/icons/ArrowBackIos";
import React from "react";
import EditableSchedule from "./EditableSchedule";
import * as api from "../AdminCreateScheduleRequests";
import * as courseApi from "../../AdminCourseEdit/AdminCourseEditRequests";
import { Schedule, Sessions, WeekSlot } from "../../../SharedObjects/schedule";
import {
  Instructor,
  Student,
  StudentGroup,
} from "../../../SharedObjects/users";
import { Course } from "../../../SharedObjects/course";

import {
  Button,
  Snackbar,
  Container,
  TextField,
  Fab,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@material-ui/core";
import { Alert, Autocomplete } from "@material-ui/lab";
import { studentGroupSearch, instructorSelect } from "./ScheduleSearch";
import { useStyles } from "../AdminCreateScheduleStyles";
import AddSessionTable from "./AddSessionTable";

interface Props {
  onBackPressed: () => void;
  backMsg: string;
}

export interface Location {
  name: string;
  _id: string;
}

const AddSession: React.FC<Props> = (props: Props) => {
  const [availableSlots, setAvailableSlots] = React.useState<WeekSlot[]>(null);
  const [sessionsLoading, setSessionsLoading] = React.useState<boolean>(false);

  const [instructors, setInstructors] = React.useState<Instructor[]>(null);
  const [selectedInstructor, setSelectedInstructor] =
    React.useState<Instructor>(null);

  const [studentGroups, setStudentGroups] =
    React.useState<StudentGroup[]>(null);
  const [selectedStudentGroup, setSelectedStudentGroup] =
    React.useState<StudentGroup>(null);

  const [courses, setCourses] = React.useState<Course[]>(null);
  const [selectedCourse, setSelectedCourse] = React.useState<Course>(null);

  const [locations, setLocations] = React.useState<Location[]>(null);
  const [selectedLocation, setSelectedLocation] =
    React.useState<{ name: string; _id: string }>(null);

  const [fetchingInProgress, setFetchingInProgress] =
    React.useState<boolean>(false);

  const [addingInProgress, setAddingInProgress] =
    React.useState<boolean>(false);
  const [snackbarAddSuccessOpen, setSnackbarAddSuccessOpen] =
    React.useState<boolean>(false);
  const [readyToFetchFreeSlots, setReadyToFetchFreeSlots] =
    React.useState<boolean>(false);

  const classes = useStyles();

  React.useEffect(() => {
    let data: StudentGroup[];
    const fetchData = async () => {
      setFetchingInProgress(true);
      data = await api.getStudentGroups("");
      setStudentGroups(data);
      setFetchingInProgress(false);
    };
    if (studentGroups == null) fetchData();
  });

  React.useEffect(() => {
    let data: Instructor[];
    const fetchData = async () => {
      setFetchingInProgress(true);
      data = await api.getInstructors();
      setInstructors(data);
      setFetchingInProgress(false);
    };
    if (instructors == null) fetchData();
  }, [selectedStudentGroup]);

  React.useEffect(() => {
    let data: Course[];
    const fetchData = async () => {
      setFetchingInProgress(true);
      data = await courseApi.getCourses(selectedStudentGroup.facultyId);
      setCourses(data);
      setFetchingInProgress(false);
    };
    if (selectedStudentGroup !== null) fetchData();
  }, [selectedStudentGroup]);

  React.useEffect(() => {
    let data: WeekSlot[];
    const fetchData = async () => {
      setFetchingInProgress(true);
      data = await api.getAvailableSlots({
        studentGroupId: selectedStudentGroup._id,
        locationId: selectedLocation._id,
        instructorId: selectedInstructor._id,
      });
      setAvailableSlots(data);
      setFetchingInProgress(false);
    };
    if (readyToFetchFreeSlots) fetchData();
    console.log("free slots load : ", availableSlots);
  }, [
    selectedInstructor,
    selectedLocation,
    selectedCourse,
    selectedStudentGroup,
  ]);

  React.useEffect(() => {
    let data: Location[];
    const fetchData = async () => {
      setFetchingInProgress(true);
      data = await api.getLocaitons();
      setLocations(data);
      setFetchingInProgress(false);
    };
    if (locations == null) fetchData();
  });

  return (
    <>
      <Snackbar
        open={snackbarAddSuccessOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarAddSuccessOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarAddSuccessOpen(false)}
          severity="success"
        >
          Sessions have been added successfully
        </Alert>
      </Snackbar>
      <Button
        startIcon={<BackIcon />}
        color="primary"
        onClick={() => props.onBackPressed()}
      >
        {props.backMsg}
      </Button>
      <h1>Add new session</h1>
      <Container className={classes.form} maxWidth="xl">
        <FormControl className={classes.formComponent}>
          <Autocomplete
            disabled={studentGroups == null}
            id="admin-add-student-group-select"
            options={studentGroups}
            getOptionLabel={(option: StudentGroup) =>
              `${option.facultyName} ${option.admissionYear} `
            }
            onChange={(e, v: StudentGroup) => setSelectedStudentGroup(v)}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select student group"
                variant="outlined"
              />
            )}
          />
        </FormControl>
        <br />
        <FormControl className={classes.formComponent}>
          <Autocomplete
            disabled={instructors == null || studentGroups == null}
            id="admin-add-schedule-instructor-select"
            options={instructors}
            getOptionLabel={(option: Instructor) =>
              `${option.firstName} ${option.lastName} `
            }
            onChange={(e, v: Instructor) => setSelectedInstructor(v)}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select instructor"
                variant="outlined"
              />
            )}
          />
        </FormControl>
        <br />
        <FormControl className={classes.formComponent}>
          <Autocomplete
            disabled={selectedStudentGroup == null || courses == null}
            id="admin-add-student-group-select"
            options={courses}
            getOptionLabel={(option: Course) => `${option.name}`}
            onChange={(e, v: Course) => setSelectedCourse(v)}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Select Course" variant="outlined" />
            )}
          />
        </FormControl>
        <br />
        <FormControl className={classes.formComponent}>
          <Autocomplete
            disabled={locations == null || studentGroups == null}
            id="admin-add-schedule-instructor-select"
            options={locations}
            getOptionLabel={(option: Location) => `${option.name}`}
            onChange={(e, v: Location) => setSelectedLocation(v)}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select location"
                variant="outlined"
              />
            )}
          />
        </FormControl>
        <br />
        <Fab
          color="primary"
          variant="extended"
          disabled={
            selectedStudentGroup == null ||
            selectedCourse == null ||
            selectedLocation == null ||
            selectedInstructor == null
          }
          onClick={(e) => setReadyToFetchFreeSlots(true)}
        >
          find available slots
        </Fab>
      </Container>
      {readyToFetchFreeSlots && (
        <AddSessionTable
          handleAdd={(e) => {
            console.log(e);
          }}
          isLoading={fetchingInProgress}
          availableSlots={availableSlots ? availableSlots : []}
        />
      )}
    </>
  );
};

export default AddSession;
