import * as api from "../GradesRequests";
import { useHistory } from "react-router-dom";
import { useStyles } from "./TAUpdateGradeStyles";
import { useState } from "react";
import { useEffect } from "react";
import GradesPage from '../GradesPage';

const TAUpdateGradePage: React.FC = () => {
  const history = useHistory();
  //Use this to navigate to different screens
  //Example: history.replace("/student/schedule") to navigate to student schedule page
  //Use like this <div className={classes.whateverStyle}/>

  const classes = useStyles();

  return <GradesPage isTA />;
}

export default TAUpdateGradePage;
