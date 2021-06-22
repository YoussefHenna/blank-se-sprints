import DatabaseClient from "../database";
import { Course } from "../../../SharedObjects/course";
import { Student } from "../../../SharedObjects/users";
import { ObjectId } from "mongodb";

export const addCourses = async (cl: DatabaseClient, courses: Course[]) => {};

export const getStudentCourses = async (
  cl: DatabaseClient,
  studentId: ObjectId
) => {
  const result = await cl.db
    .collection("students")
    .find({ _id: studentId }, { projection: { enrolledCoursesId: true } }) //find the id of courses that a student is enrolled in
    .toArray(); //convert the mongodb cursor to array

  const coursesId = result[0].enrolledCoursesId; //extract the array of courses from the query result

  const courses = await cl.db
    .collection("courses")
    .find({ _id: { $in: coursesId } }) //find the courses that has their id in the array coursesId
    .toArray();

  return courses;
};

export const getAllStudents = async (cl: DatabaseClient) => {
  const students: Student[] = await cl.db
    .collection("students")
    .find()
    .toArray();
  return students;
};
