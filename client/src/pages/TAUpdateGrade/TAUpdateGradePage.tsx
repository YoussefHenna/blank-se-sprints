import * as api from "./TAUpdateGradeRequests";
import { useHistory } from "react-router-dom";
import { useStyles } from "./TAUpdateGradeStyles";
import { updateGrades } from "./TAUpdateGradeRequests";
import { useState } from "react";
import { useEffect } from "react";




const TAUpdateGradePage: React.FC = () => {
  const history = useHistory();
  //Use this to navigate to different screens
  //Example: history.replace("/student/schedule") to navigate to student schedule page

  //Use like this <div className={classes.whateverStyle}/>

  const [grades, setGrades] = useState({})

  useEffect(() => {
    setGrades(updateGrades())
  }, []);
  
  
  

  const classes = useStyles();

  return <div>{/** Put ui elements here */}</div>;
}
  ;

export default TAUpdateGradePage;
