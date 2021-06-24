import axios from "../../util/Axios";

export const getGrades = async () => {
  try {
    const result = await axios.get("/student/grades")
 //   console.log(result)// or localhost:3500/student/grades
    return result.data.grades
  } catch (error) {
    console.log(error)
  }

}

