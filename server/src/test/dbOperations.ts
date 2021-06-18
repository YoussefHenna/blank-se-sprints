import DatabaseClient from "../database";
import { Course } from "../SharedObjects/course";
import { Student } from "../SharedObjects/users";

export const addStudents = async (cl: DatabaseClient, students: Student[]) => {
};

export const addCourses = async (cl: DatabaseClient, courses: Course[]) => {
};


export const getStudentCourses = async (cl : DatabaseClient, studentId : string ) => {

}

export const getAllStudents = async (cl : DatabaseClient) => {

  const students : Student[] = await cl.db.collection('students').find().toArray()
  return students

}
