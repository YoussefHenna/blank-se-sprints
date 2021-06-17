export interface User {
    firstName : string
    lastName : string
    password : string //not the password itself but its bcrypt hash
    _id : number // user id
}
export interface Student extends User {
    facultyId : number
    enrolledCoursesId : number[] // array of ids of enrolled courses
    admissionYear : number //the year when the student was admitted
    semester : number 
}

export interface Instructor extends User {
    facultyId : number
    coursesId : number[] // array of ids of courses taught by the instructor
}

export interface Admin extends User {

}
