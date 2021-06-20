export interface User {
  firstName: string;
  lastName: string;
  password: string; //not the password itself but its bcrypt hash
  _id: any; // user id
}
export interface Student extends User {
  facultyId: string;
  enrolledCoursesId: any[]; // array of ids of enrolled courses
  admissionYear: number; //the year when the student was admitted
  semester: number;
}

export interface Instructor extends User {
  facultyId: any;
  coursesId: any[]; // array of ids of courses taught by the instructor
}

export interface Admin extends User {
  coursesId: any[]; // array of ids of courses added by admin
}
