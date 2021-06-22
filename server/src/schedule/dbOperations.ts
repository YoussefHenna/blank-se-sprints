import { Student } from "../../../SharedObjects/users";
import {
  FreeSlotsRequest,
  Session,
  WeekSlot,
  Slot,
  WeekDay,
  SessionsToBeAdded,
} from "../../../SharedObjects/schedule";
import DatabaseClient from "./../database";
import * as Exceptions from "./exceptions";
import { ObjectId } from "mongodb";
import SessionDBSchema from "./SessionDBSchema";


//the following code is too verbose and ineffecient, I'm looking for a better way to perform this

const includesEq = (x: WeekSlot, y: WeekSlot[]) => {
  //using the built-in include method only compares using reference of objects

  for (const i of y) {
    if (i.weekDay === x.weekDay && i.slot === x.slot) return true;
  }

  return false;
};

const availableSlots = (occupied: WeekSlot[]) => {
  //create an array of all possible 5x7 slots, then removes the ones that exists in array of occupied slots
  let available = [];

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 5; j++) {
      available.push({ weekDay: i, slot: j }); //create all possible slots
    }
  }

  return available.filter((s) => !includesEq(s, occupied)); //remove all the slots that exists in the array of occupied slots
};

export const findAvailableSlots = async (
  //after the admin enters the desired course, instructor and student group, the function will search for empty slots
  cl: DatabaseClient,
  req: FreeSlotsRequest
) => {
  const occupied = await cl.db //find the occupied slots
    .collection("sessions")
    .find(
      {
        $or: [
          // query for sessions thats satisfy at least one of the following
          { studentGroupId: new ObjectId(req.studentGroupId) }, //get the occupied slots of the student group
          { locationId: new ObjectId(req.locationId) }, //get the occupied slots of the location
          { instructorId: new ObjectId(req.instructorId) }, //get the occupied slots of the instructor
        ],
      },
      {
        projection: {
          //get only the slot and the weekday
          slot: true,
          weekDay: true,
        },
      }
    )
    .toArray();
  console.log(`Occupied Sessions`)
  console.log(occupied)

  return availableSlots(<WeekSlot[]>occupied);
};

<<<<<<< HEAD
export const addSession = async (cl: DatabaseClient, session: Session) => {};
=======

export const addSessionsToSlots = async (cl: DatabaseClient, toBeAdded: SessionsToBeAdded) => {

  let sessions : SessionDBSchema[] = []

  toBeAdded.forEach((weekDay,slot,session)=>{
    sessions.push({
      weekDay : weekDay,
      slot : slot,
      studentGroupId : session.studentGroupId,
      instructorId : session.instructorId,
      locationId : session.locationId,
      courseId : session.courseId
    })
  })

  await cl.db.collection('sessions').insertMany(sessions)

};



>>>>>>> 33a758124193a5ed01f480fae06f5eec5cd65d8c

