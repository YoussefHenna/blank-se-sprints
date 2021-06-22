import * as api from "./StudentViewGradesRequests";
import { useHistory } from "react-router-dom";
import { useStyles } from "./StudentViewGradesStyles";
import { getStudentsGrades } from "./StudentViewGradesRequests";
import { useState } from "react";
import { useEffect } from "react";


const StudentViewGradesPage: React.FC = () => {
  const history = useHistory();
  //Use this to navigate to different screens
  //Example: history.replace("/student/schedule") to navigate to student schedule page
//Use like this <div className={classes.whateverStyle}/>
  
  
const [grades, setGrades] = useState({})

  useEffect(() => {
    setGrades(getStudentsGrades())
  }, []);
  
  
  
  const classes = useStyles();

  return <div>{JSON.stringify(grades)}</div>;
};

export default StudentViewGradesPage;
