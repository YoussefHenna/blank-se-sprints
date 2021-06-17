import { Student } from './SharedObjects/users'
import { Course } from './SharedObjects/course'

export const courses : Course[]= [
  {
    name : "CSEN102",
    id : 23,
    description : "Introduction to Programming",
    instructorsId : [11]
  },
  {
    name : "CSEN103",
    id : 24,
    description : "Technical foundations",
    instructorsId : [12],
  },
  {
    name : "ECM103",
    id : 30,
    description : "Introduction to Economics",
    instructorsId : [17]
  },
  {
    name : "MGMT101",
    id : 31,
    description : "Introduction to Management",
    instructorsId : [16]
  },
  {
    name : "PHYS101",
    id : 25,
    description : "Introduction to Physics",
    instructorsId : [14],
  },
  {
    name : "PROD103",
    id : 28,
    description : "Production Technology",
    instructorsId : [14],
  }
]

export const students : Student[] = [
  {
    firstName : "Ahmed",
    lastName : "Ibrahim", 
    facultyId : 3,
    id : 12,
    enrolledCoursesId : [23,24,25],
    admissionYear : 2019,
    semester : 1,
    password : "1298037",
  },
  {
    firstName : "Karim",
    lastName : "Abdulghani",
    facultyId : 3,
    id : 13,
    enrolledCoursesId : [23,24,25],
    admissionYear : 2019,
    semester : 1,
    password : "1298037",
  },
  {
    firstName : "Ahmed",
    lastName : "Ibrahim",
    facultyId : 4,
    id : 14,
    enrolledCoursesId : [23,24,28],
    admissionYear : 2019,
    semester : 1,
    password : "1298037",
  },
  {
    firstName : "Ahmed",
    lastName : "Ibrahim",
    facultyId : 5,
    id : 15,
    enrolledCoursesId : [23,30,31],
    admissionYear : 2019,
    semester : 1,
    password : "1298037",
  },
]
