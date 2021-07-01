import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import {
  Schedule,
  Slot,
  SessionsToBeModified,
  SLOT_TIME_MAPPING_24H_FORMAT,
  WeekDayInverse,
} from "../../../SharedObjects/schedule";

interface Props {
  schedule: Schedule;
  toBeDeleted?: SessionsToBeModified;
  isLoading: boolean;
}
const columns = [
  { field: "week", headerName: "Week", width: 150 },
  { field: "time", headerName: "time", width: 150 },
  { field: "locationName", headerName: "Location", width: 300 },
  { field: "courseName", headerName: "Course", width: 150 },
  { field: "instructorName", headerName: "Instructor", width: 150 },
];

const ViewableSchedule = (props: Props) => {
  let rows = [];
  props.schedule.forEach((week, slot, session) => {
    rows.push({
      id: Schedule.keyString(week, slot),
      week:WeekDayInverse[week],
      time: `${SLOT_TIME_MAPPING_24H_FORMAT[slot][0]} - ${SLOT_TIME_MAPPING_24H_FORMAT[slot][1]}`,
      locationName: session.locationName,
      courseName: session.courseName,
      instructorName: session.instructorName,
    });
  });
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        loading={props.isLoading}
      />
    </div>
  );
};
export default ViewableSchedule;
