import { Student } from "../SharedObjects/users";
import { Course } from "../SharedObjects/course";

export const courses: Course[] = [
  {
    name: "CSEN102",
    _id: 23,
    description: "Introduction to Programming",
    instructorsId: [11],
  },
  {
    name: "CSEN103",
    _id: 24,
    description: "Technical foundations",
    instructorsId: [12],
  },
  {
    name: "ECM103",
    _id: 30,
    description: "Introduction to Economics",
    instructorsId: [17],
  },
  {
    name: "MGMT101",
    _id: 31,
    description: "Introduction to Management",
    instructorsId: [16],
  },
  {
    name: "PHYS101",
    _id: 25,
    description: "Introduction to Physics",
    instructorsId: [14],
  },
  {
    name: "PROD103",
    _id: 28,
    description: "Production Technology",
    instructorsId: [14],
  },
];

export const students: Student[] = [
  {
    firstName: "Ahmed",
    lastName: "Ibrahim",
    facultyId: 3,
    _id: 12,
    enrolledCoursesId: [23, 24, 25],
    admissionYear: 2019,
    semester: 1,
    password: "1298037",
  },
  {
    firstName: "Karim",
    lastName: "Abdulghani",
    facultyId: 3,
    _id: 13,
    enrolledCoursesId: [23, 24, 25],
    admissionYear: 2019,
    semester: 1,
    password: "1298037",
  },
  {
    firstName: "Ahmed",
    lastName: "Ibrahim",
    facultyId: 4,
    _id: 14,
    enrolledCoursesId: [23, 24, 28],
    admissionYear: 2019,
    semester: 1,
    password: "1298037",
  },
  {
    firstName: "Ahmed",
    lastName: "Ibrahim",
    facultyId: 5,
    _id: 15,
    enrolledCoursesId: [23, 30, 31],
    admissionYear: 2019,
    semester: 1,
    password: "1298037",
  },
];
