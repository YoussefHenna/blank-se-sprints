import axios from "../../util/Axios";
import { BACKEND_URL } from "client/src/constants.ts"; //at deployment stage ,we wil add our domain here .
//but until now i only used the localhost
/**
 * Use axios for http requests to the server- https://github.com/axios/axios (for docs on how to use)
 * Export functions from this file to be used in page tsx file
 *
 * sample request: axios.get('/user?ID=12345')
 */
export async function getStudentsGrades() {
  let jwtToken = localStorage.getItem("uset-jwt-token");

  return await axios.get("${BACKEND_URL}/student/grades",
    {
      headers: "Bearer " + jwtToken,
    }
  );
  



}