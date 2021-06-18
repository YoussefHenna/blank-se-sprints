
export interface User {
    firstName : string
    lastName : string
    password : string //not the password itself but its bcrypt hash
    _id : string // user id
}
export interface Student extends User {
    facultyId : string
    enrolledCoursesId : string[] // array of ids of enrolled courses
    admissionYear : number //the year when the student was admitted
    semester : number 
}

export interface Instructor extends User {
    facultyId : string
    coursesId : string[] // array of ids of courses taught by the instructor
}

export interface Admin extends User {

}
