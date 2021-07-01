export interface User {
  firstName: string;
  lastName: string;
  username: string;
  passwordHash?: string;
  _id: any; // user id
}

export interface Student extends User {
  groupId: any[];
}

export interface Instructor extends User {
  facultyId: any;
  coursesId?: any[]; // array of ids of courses taught by the instructor
}

export interface Admin extends User {
  coursesId: any[]; // array of ids of courses added by admin
}

export interface StudentGroup {
  _id: any;
  semester: number;
  facultyId: any;
  admissionYear: number; //the year when the student was admitted
  coursesId?: any[]; // array of ids of courses
  facultyName?: string;
}
