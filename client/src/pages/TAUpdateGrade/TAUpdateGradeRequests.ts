import axios from "../../util/Axios";
/**
 * Use axios for http requests to the server- https://github.com/axios/axios (for docs on how to use)
 * Export functions from this file to be used in page tsx file
 *
 * sample request: axios.get('/user?ID=12345')
 */
 export const updateGrades = async () => {
  try {
    const result = await axios.patch("/student/grades")
   // console.log(result)// or localhost:3500/student/grades
    return result.data.grades
  } catch (error) {
    console.log(error)
  }

}

