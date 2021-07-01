import axios from "../../util/Axios";
import { Session } from "../../SharedObjects/schedule";

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
  const result = await axios.get(`/restricted/schedule/instructor/${id}`);
  return result.data;
};

export const getStudentGroupSchedules = async (id: string) => {
  const result = await axios.get(`/restricted/schedule/student-group/${id}`);
  return result.data;
};

export const deleteSessions = async (sessionsId: string[]) => {
  const result = await axios.delete("/restricted/sessions", {
    data: sessionsId,
  });
  return result.data;
};
