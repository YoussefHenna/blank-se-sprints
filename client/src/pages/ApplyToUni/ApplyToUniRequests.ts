import { Faculty } from "../../../../SharedObjects/faculty";
import axios from "../../util/Axios";
import { ApplyState } from "./ApplyToUniPage";

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

export const submitApplication = async (
  application: ApplyState
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post("/apply", application);
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
