import * as api from "./StudentMajorInfoRequests";
import { useHistory } from "react-router-dom";
import { useStyles } from "./StudentMajorStyles";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StudentMajorInfoPage: React.FC = () => {
  const history = useHistory();
  //Use this to navigate to different screens
  //Example: history.replace("/student/schedule") to navigate to student schedule page

  //Use like this <div className={classes.whateverStyle}/>
  const classes = useStyles();

  function createData(
    name: string,
    course: string,
    Description: string,
    Credit: number
  ) {
    return { name, course, Description, Credit };
  }

  const rows = [
    createData("Informatics and Computer Science :-", null, null, null),
    createData(null, "CSEN102", "Introduction to Programming", 4),
    createData(null, "SE101", "Intro to Software Engineering", 4),
    createData(null, "CSEN103", "Introduction to Computer Science", 2),
    createData(null, "INDS103", "Intro to Data Science", 3),
    createData(null, "CENT101", "Computer Networks", 100),
    createData(null, "INDS103", "Intro to Data Science", 3),
    createData("Business & Administration :-", null, null, null),
    createData(null, "MGMT101", "Introduction to Management", 5),
    createData(null, "ECM103", "Introduction to Economics", 4),
    createData("Engineering :-", null, null, null),
    createData(null, "TECH101", "Technical Drawing", 4),
    createData(null, "MTH403", "Math 4", 2),
    createData(null, "PHYS101", "Introduction to Physics", 2),
  ];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Majors</TableCell>
            <TableCell align="right">Course</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Credit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.course}</TableCell>
              <TableCell align="right">{row.Description}</TableCell>
              <TableCell align="right">{row.Credit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentMajorInfoPage;
