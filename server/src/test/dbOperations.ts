import DatabaseClient from "../database";
import { Course } from "../SharedObjects/course";
import { Student } from "../SharedObjects/users";

export const addStudents = async (cl: DatabaseClient, students: Student[]) => {

    await cl.db.collection("students").insertMany(students);
};

export const addCourses = async (cl: DatabaseClient, courses: Course[]) => {

    await cl.db.collection("courses").insertMany(courses);

};
