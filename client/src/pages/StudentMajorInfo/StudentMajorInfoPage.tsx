import "./StudentMajorInfoPage.css";
import * as api from "./StudentMajorInfoRequests";
import { useHistory } from "react-router-dom";

const StudentMajorInfoPage: React.FC = () => {
  const history = useHistory();
  //Use this to navigate to different screens
  //Example: history.replace("/student/schedule") to navigate to student schedule page

  return <div>{/** Put ui elements here */}</div>;
};

export default StudentMajorInfoPage;
