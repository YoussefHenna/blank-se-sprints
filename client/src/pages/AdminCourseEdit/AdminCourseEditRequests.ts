import axios from "../../util/Axios";
import { Faculty } from "../../../../SharedObjects/faculty";
import { Course } from "../../../../SharedObjects/course";

export const getFaculties = async (): Promise<Faculty[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get("/faculties");
      if (result.status === 200) {
        resolve(result.data.faculties);
      } else {
        reject(result.data);
      }
    } catch (e) {
      reject(e);
    }
  });
};

export const getCourses = async (facId: string): Promise<Course[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get("/courses/" + facId);
      if (result.status === 200) {
        resolve(result.data.courses);
      } else {
        reject(result.data);
      }
    } catch (e) {
      reject(e);
    }
  });
};

export const addCourse = async (course: Course): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post("/course", course);
      if (result.status === 200) {
        resolve();
      } else {
        reject(result.data);
      }
    } catch (e) {
      reject(e.response.data ? e.response.data : e);
    }
  });
};

export const updateCourse = async (
  courseId: string,
  course: Course
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.put("/course/" + courseId, course);
      if (result.status === 200) {
        resolve();
      } else {
        reject(result.data);
      }
    } catch (e) {
      reject(e.response.data ? e.response.data : e);
    }
  });
};

export const deleteCourse = async (courseId: string): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.delete("/course/" + courseId);
      if (result.status === 200) {
        resolve();
      } else {
        reject(result.data);
      }
    } catch (e) {
      reject(e.response.data ? e.response.data : e);
    }
  });
};
