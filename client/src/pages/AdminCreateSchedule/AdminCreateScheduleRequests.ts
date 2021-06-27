import axios from "../../util/Axios";
import {Instructor, StudentGroup} from '../../../../SharedObjects/users'
/**
 * Use axios for http requests to the server- https://github.com/axios/axios (for docs on how to use)
 * Export functions from this file to be used in page tsx file
 *
 * sample request: axios.get('/user?ID=12345')
 */


export const getInstructors = async () => {
  const response = await axios.get('/instructors')
  const data : Instructor[] = response.data
  return data
}


export const getStudentGroups = async () => {
  const response = await axios.get('/student-groups')
  const data : StudentGroup[] = response.data
  return data
}
