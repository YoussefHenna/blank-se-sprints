import axios from "../../util/Axios";

/**
 * Use axios for http requests to the server- https://github.com/axios/axios (for docs on how to use)
 * Export functions from this file to be used in page tsx file
 *
 * sample request: axios.get('/user?ID=12345')
 */

export const getInstructors = async () => {
  const result = await axios.get("/restricted/instructors");
  return result.data;
};

export const getStudentGroups = async (q: string) => {
  const result = await axios.get("/restricted/student-groups", {
    params: { q },
  });
  return result.data;
};

export const getInstructorSchedules = async (id: string) => {
  const result = await axios.get(`/restricted/instructor/${id}`);
  return result.data;
};
