import BackIcon from "@material-ui/icons/ArrowBackIos";
import React from "react";
import EditableSchedule from "./EditableSchedule";
import * as api from "../AdminCreateScheduleRequests";
import { Schedule, Sessions } from "../../../SharedObjects/schedule";
import { Button, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
interface Props {
  onBackPressed: () => void;
  backMsg: string;
  selectedId: string;
  scheduleType: "StudentGroup" | "Instructor";
}

const ScheduleEdit: React.FC<Props> = (props: Props) => {
  const [retrievedSessions, setRetrievedSessions] = React.useState<
    Sessions | undefined
  >();
  const [sessionsLoading, setSessionsLoading] = React.useState<boolean>(false);

  const [toBeDeleted, setToBeDeleted] = React.useState<string[] | undefined>(
    undefined
  );
  const [deleteInProgress, setDeleteInProgress] =
    React.useState<boolean>(false);
  const [snackbarDeleteSuccessOpen, setSnackbarDeleteSuccessOpen] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    let result: { msg: string };
    const fetchAndDelete = async () => {
      setDeleteInProgress(true);
      try {
        result = await api.deleteSessions(toBeDeleted);
        setSnackbarDeleteSuccessOpen(true);
        setToBeDeleted(undefined);
        console.log(result);
        setRetrievedSessions(undefined);
      } catch (e) {
        console.error(e);
      }
      setDeleteInProgress(false);
    };
    if (toBeDeleted) fetchAndDelete();
  }, [toBeDeleted]);

  React.useEffect(() => {
    let data: Sessions;
    const fetchData = async () => {
      setSessionsLoading(true);
      if (props.scheduleType === "Instructor")
        data = await api.getInstructorSchedules(props.selectedId);
      else data = await api.getStudentGroupSchedules(props.selectedId);

      setRetrievedSessions(data);
      setSessionsLoading(false);
    };

    if (!retrievedSessions) fetchData();
  }, [retrievedSessions, props.selectedId]);
  return (
    <>
      <Snackbar
        open={snackbarDeleteSuccessOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarDeleteSuccessOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarDeleteSuccessOpen(false)}
          severity="success"
        >
          Sessions have been deleted successfully
        </Alert>
      </Snackbar>
      <Button
        startIcon={<BackIcon />}
        color="primary"
        onClick={() => props.onBackPressed()}
      >
        {props.backMsg}
      </Button>
      <h1>Edit Schedule</h1>
      <p>{retrievedSessions ? retrievedSessions.toString() : "Loading"}</p>
      <EditableSchedule
        handleDelete={(s: string[]) => {
          console.log("handle delete");
          setToBeDeleted(s);
        }}
        isLoading={
          sessionsLoading || retrievedSessions === undefined || deleteInProgress
        }
        schedule={new Schedule(retrievedSessions)}
      />
    </>
  );
};

export default ScheduleEdit;
