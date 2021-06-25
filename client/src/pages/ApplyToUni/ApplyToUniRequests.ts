import { Faculty } from "../../../../SharedObjects/faculty";
import axios from "../../util/Axios";

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
