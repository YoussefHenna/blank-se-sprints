import {Express} from 'express'
import {Database} from "./database";
import * as testData from './testData'

// APIs that can be used for testing 

export const addStudentTest = (app : Express,db : Database) => {

  app.get("/add-students-test",async (req,res)=>{ //NOTE : GET for this operation isn't semantically correct, it's only used for testing

    db.addStudents(testData.students)
    res.send('success')

  })

  app.get("/add-courses-test",async (req,res)=>{ 

    db.addCourses(testData.courses)
    res.send('success')

  })

} 
