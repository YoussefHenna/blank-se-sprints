import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button, Fab } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import {
  Schedule,
  Slot,
  SessionsToBeModified,
  WeekDayInverse,
  SLOT_TIME_MAPPING_24H_FORMAT,
} from "../../../SharedObjects/schedule";

interface Props {
  schedule: Schedule;
  isLoading: boolean;
  handleDelete: (e: string[]) => void;
}

const columns = [
  { field: "week", headerName: "Week", width: 150 },
  { field: "time", headerName: "time", width: 150 },
  { field: "locationName", headerName: "Location", width: 300 },
  { field: "courseName", headerName: "Course", width: 150 },
  { field: "instructorName", headerName: "Instructor", width: 150 },
];

const EditableSchedule = (props: Props) => {
  const [deleteMode, setDeleteMode] = React.useState<boolean>(false);
  const [selectedForDelete, setSelectedForDelete] = React.useState<string[]>();
  let rows = [];
  props.schedule.forEach((week, slot, session) => {
    rows.push({
      id: session._id,
      week: week,
      time: `${SLOT_TIME_MAPPING_24H_FORMAT[slot][0]} - ${SLOT_TIME_MAPPING_24H_FORMAT[slot][1]}`,
      locationName: session.locationName,
      courseName: session.courseName,
      instructorName: session.instructorName,
    });
  });
  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          loading={props.isLoading}
          checkboxSelection={deleteMode}
          onSelectionModelChange={(e) =>
            setSelectedForDelete(e.selectionModel.map((x) => x.toString()))
          }
        />
      </div>
      {deleteMode ? (
        <>
          <Button
            style={{ margin: "20px" }}
            onClick={() => props.handleDelete(selectedForDelete)}
            color="primary"
          >
            confirm
          </Button>
          <Button
            style={{ margin: "20px" }}
            onClick={() => setDeleteMode(false)}
            color="primary"
          >
            cancel
          </Button>
        </>
      ) : (
        <Fab
          style={{ margin: "20px" }}
          variant="extended"
          onClick={() => setDeleteMode(true)}
          color="primary"
        >
          <Delete />
          select sessions to delete
        </Fab>
      )}
    </>
  );
};
export default EditableSchedule;
