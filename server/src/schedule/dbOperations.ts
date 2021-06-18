import { Student } from "../SharedObjects/users";
import {StudentSchedule, StudentSession} from "../SharedObjects/schedule"
import DatabaseClient from "./../database";
import * as Exceptions from './exceptions'
import {ObjectId} from 'Mongodb'


export const initializeStudentSchedule = async (cl : DatabaseClient, studentId : ObjectId) => {

  let scheduleAlreadyExists = false

  await cl.db.collection('student-schedules').find({studentId : studentId}).forEach((doc)=>{ 
    scheduleAlreadyExists = true
  })

  if (scheduleAlreadyExists)
    throw new Exceptions.ScheduleAlreadyExists("schedule already exists");

  await cl.db.collection('student-schedules').insert(new StudentSchedule(studentId,[]))

}
