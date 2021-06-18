import "./StudentViewSchedulePage.css";
import * as api from "./StudentViewScheduleRequests";
import { useHistory } from "react-router-dom";

const StudentViewSchedulePage: React.FC = () => {
  const history = useHistory();
  //Use this to navigate to different screens
  //Example: history.replace("/student/schedule") to navigate to student schedule page

  return <div>{/** Put ui elements here */}</div>;
};

export default StudentViewSchedulePage;
