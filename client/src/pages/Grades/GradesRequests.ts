import axios from '../../util/Axios'

import IData from '../../SharedObjects/GradesData.js'

export type { IData };

/**
 * Use axios for http requests to the server- https://github.com/axios/axios (for docs on how to use)
 * Export functions from this file to be used in page tsx file
 *
 * sample request: axios.get('/user?ID=12345')
 */

export const studentGetGrades = async (): Promise<IData> => {
  const result = await axios.get('/restricted/student/grades')
  console.log(result)
  return result.data
}

export const instructorGetGrades = async ({ studentUsername }): Promise<IData> => {
  const result = await axios.get('/restricted/instructor/grades/' + studentUsername)
  return result.data
}

export const instructorUpdateGrades = async (data: IData): Promise<IData> => {
  try {
    const result = await axios.patch('/restricted/instructor/grades', data)
    console.log(result) // or localhost:3500/in/grades
    return result.data
  } catch (error) {
    console.log(error)
  }
}
