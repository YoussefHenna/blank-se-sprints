import * as api from "./StudentViewGradesRequests";
import { useHistory } from "react-router-dom";
import { useStyles } from "./StudentViewGradesStyles";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../util/Axios";
import { getGrades } from "./StudentViewGradesRequests";



const StudentViewGradesPage: React.FC = () => {
  const history = useHistory();
  //Use this to navigate to different screens
  //Example: history.replace("/student/schedule") to navigate to student schedule page
//Use like this <div className={classes.whateverStyle}/>
  
  
const [grades, setGrades] = useState({})

  useEffect(() => {
    setGrades(getGrades())
  }, []);
  
  
  
  const classes = useStyles();

  return (
    <div>
      <h1>{grades} </h1>
    </div>
  );
};

export default StudentViewGradesPage;
