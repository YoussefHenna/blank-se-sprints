import axios from "../../util/Axios";
/**
 * Use axios for http requests to the server- https://github.com/axios/axios (for docs on how to use)
 * Export functions from this file to be used in page tsx file
 *
 * sample request: axios.get('/user?ID=12345')
 */

export const getGrades = async ({studentId}) => {
  try {
    // TODO: use studentId to get the data from the backend
    const result = {
      data: {
        grades: [
          {
            name: "math",
            GPA: "A",
          },
          {
            name: "pythics",
            GPA: "B",
          },
          {
            name: "mechanics",
            GPA: "A",
          },
          {
            name: "circuits",
            GPA: "A+",
          },
          {
            name: "language",
            GPA: "A-",
          },
          {
            name: "cs",
            GPA: "A",
          },
          {
            name: "it",
            GPA: "A+",
          },
        ],
        student: {
          name: "Mohamed Sameer",
          studentId: "5000284",
          faculty: "Computer Science",
        },
      },
    };

    // const result = await axios.get("/student/grades?studentId=" + studentId);
    // console.log(result)
    // or localhost:3500/student/grades
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateGrades = async (data) => {
  try {
    console.log(data);
    return;
    const result = await axios.patch("/student/grades", data);
    // console.log(result)// or localhost:3500/student/grades
    return result.data.grades;
  } catch (error) {
    console.log(error);
  }
};
