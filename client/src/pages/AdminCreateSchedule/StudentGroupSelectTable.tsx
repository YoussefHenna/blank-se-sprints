import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { StudentGroup } from "../../../SharedObjects/users";

interface Props {
  data: StudentGroup[];
  isLoading: boolean;
}
const columns = [
  { field: "facultyName", headerName: "Faculty", width: 300 },
  { field: "admissionYear", headerName: "Year", width: 150 },
  { field: "semester", headerName: "Semester", width: 150 },
];

const StudentGroupSelectTable = (props: Props) => {
  const rows = props.data.map((r) => ({
    facultyName: r.facultyName,
    admissionYear: r.admissionYear,
    semester: r.semester,
    id: r._id,
  }));
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
export default StudentGroupSelectTable;
