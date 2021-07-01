import { Button } from "@material-ui/core";
import BackIcon from "@material-ui/icons/ArrowBackIos";
import React from "react";
import EditableSchedule from "./EditableSchedule";
import * as api from "../AdminCreateScheduleRequests";
import { Schedule, Sessions } from "../../../SharedObjects/schedule";

interface Props {
  onBackPressed: () => void;
  backMsg: string;
  selectedId: string;
}

const ScheduleEdit: React.FC<Props> = (props: Props) => {
  const [retrievedSessions, setRetrievedSessions] = React.useState<
    Sessions | undefined
  >();
  const [sessionsLoading, setSessionsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    let data: Sessions;
    const fetchData = async () => {
      setSessionsLoading(true);
      data = await api.getInstructorSchedules(props.selectedId);
      console.log("pang!");
      setRetrievedSessions(data);
      setSessionsLoading(false);
    };

    if (!retrievedSessions) fetchData();
  }, [retrievedSessions, props.selectedId]);
  return (
    <>
      <Button
        startIcon={<BackIcon />}
        color="primary"
        onClick={() => props.onBackPressed()}
      >
        {props.backMsg}
      </Button>
      <h1>Edit Schedule</h1>
      <p>{props.selectedId}</p>
      <EditableSchedule
        isLoading={sessionsLoading}
        schedule={new Schedule(retrievedSessions)}
      />
    </>
  );
};

export default ScheduleEdit;
