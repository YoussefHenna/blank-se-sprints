import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useStyles } from "./StudentViewGradesStyles";
import GradesPage from '../GragesPage';

const StudentViewGradesPage: React.FC = () => {
  const history = useHistory();
  //Use this to navigate to different screens
  //Example: history.replace("/student/schedule") to navigate to student schedule page
  //Use like this <div className={classes.whateverStyle}/>

  const classes = useStyles();

  return <GradesPage isTA={false}/>;
};

export default StudentViewGradesPage;
