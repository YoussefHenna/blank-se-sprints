import { ObjectId } from 'mongodb';
import {Slot, WeekDay} from '../SharedObjects/schedule'

interface SessionDBSchema {
    slot : Slot
    weekDay : WeekDay
    studentGroupId : ObjectId
    locationId : ObjectId
    instructorId : ObjectId
    courseId : ObjectId
}

export default SessionDBSchema