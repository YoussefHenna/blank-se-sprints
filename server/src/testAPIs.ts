import {Express} from 'express'
import {Database} from "./database";
import fs from 'fs'

// APIs that can be used for testing 

export const addStudentTest = (app : Express,db : Database) => {

  app.get("/addstudentstest",async (req,res)=>{ //NOTE : GET for this operation isn't semantically correct, it's only used for testing

    fs.readFile(`${__dirname}/../src/testData/students.json`,(err : Error,buffer : ArrayBuffer)=>{

      if (err){
        console.log(err)
        res.send('file IO error')
        return
      }

      db.addStudents(JSON.parse(buffer.toString()))
      res.send('students added')

    })
  })

} 
