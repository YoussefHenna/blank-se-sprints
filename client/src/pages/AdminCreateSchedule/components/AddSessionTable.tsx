import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button, Fab } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Instructor, StudentGroup } from "../../../SharedObjects/users";
import { Course } from "../../../SharedObjects/course";
import { Location } from "./AddSession";
import {
  Schedule,
  WeekDayInverse,
  SLOT_TIME_MAPPING_24H_FORMAT,
  WeekSlot,
} from "../../../SharedObjects/schedule";
import Add from "@material-ui/icons/Add";

interface Props {
  isLoading: boolean;
  handleAdd: (e: string[]) => void;
  availableSlots: WeekSlot[];
}

const columns = [
  { field: "week", headerName: "Week", width: 150 },
  { field: "time", headerName: "time", width: 150 },
];

const AddSessionTable = (props: Props) => {
  const [addMode, setAddMode] = React.useState<any>();
  const [selectedForAdding, setSelectedForAdding] = React.useState<string[]>();
  let rows = props.availableSlots.map((t) => ({
    id: Schedule.keyString(t.weekDay, t.slot),
    week: WeekDayInverse[t.weekDay],
    time: `${SLOT_TIME_MAPPING_24H_FORMAT[t.slot][0]} ${
      SLOT_TIME_MAPPING_24H_FORMAT[t.slot][1]
    }`,
  }));

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={props.isLoading}
          checkboxSelection={addMode}
          onSelectionModelChange={(e) =>
            setSelectedForAdding(e.selectionModel.map((x) => x.toString()))
          }
        />
      </div>
      {addMode ? (
        <>
          <Button
            style={{ margin: "20px" }}
            onClick={() => props.handleAdd(selectedForAdding)}
            color="primary"
          >
            confirm
          </Button>
          <Button
            style={{ margin: "20px" }}
            onClick={() => setAddMode(false)}
            color="primary"
          >
            cancel
          </Button>
        </>
      ) : (
        <Fab
          style={{ margin: "20px" }}
          variant="extended"
          onClick={() => setAddMode(true)}
          color="primary"
        >
          <Add />
          select sessions to add
        </Fab>
      )}
    </>
  );
};
export default AddSessionTable;
