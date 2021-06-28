import axios from "../../util/Axios";
/**
 * Use axios for http requests to the server- https://github.com/axios/axios (for docs on how to use)
 * Export functions from this file to be used in page tsx file
 *
 * sample request: axios.get('/user?ID=12345')
 */

export const requestLogin = async (loginData : {username : string,password : string})=>{
  const result = await axios.post("http://localhost:3500/auth/login", loginData);
  return result.data
}
