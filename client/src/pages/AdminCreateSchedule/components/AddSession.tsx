import BackIcon from "@material-ui/icons/ArrowBackIos";
import React from "react";
import EditableSchedule from "./EditableSchedule";
import * as api from "../AdminCreateScheduleRequests";
import { Schedule, Sessions } from "../../../SharedObjects/schedule";
import { Button, Snackbar, Container, TextField, Fab } from "@material-ui/core";
import { Alert, Autocomplete } from "@material-ui/lab";
import { studentGroupSearch, instructorSelect } from "./ScheduleSearch";
interface Props {
  onBackPressed: () => void;
  backMsg: string;
}

const AddSession: React.FC<Props> = (props: Props) => {
  const [retrievedSessions, setRetrievedSessions] = React.useState<
    Sessions | undefined
  >();
  const [sessionsLoading, setSessionsLoading] = React.useState<boolean>(false);

  const [selectedInstructor, setSelectedInstructor] = React.useState<any>();

  //  const []

  const [addingInProgress, setAddingInProgress] =
    React.useState<boolean>(false);
  const [snackbarAddSuccessOpen, setSnackbarAddSuccessOpen] =
    React.useState<any>();
  React.useState<boolean>(false);

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
      <Container maxWidth="xl">
        <h1>uw</h1>
      </Container>
    </>
  );
};

export default AddSession;
