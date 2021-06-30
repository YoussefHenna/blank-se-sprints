import { ObjectId } from "mongodb";
import { SessionType, Slot, WeekDay } from "../../SharedObjects/schedule";

interface SessionDBSchema {
  slot: Slot;
  weekDay: WeekDay;
  studentGroupId: ObjectId;
  locationId: ObjectId;
  instructorId: ObjectId;
  courseId: ObjectId;
  sessionType: SessionType;
}

export default SessionDBSchema;
