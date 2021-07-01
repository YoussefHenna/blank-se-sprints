export enum SessionType {
  Lecture = 0,
  Tutorial = 1,
}

export enum WeekDay {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export enum Slot {
  First = 0,
  Second = 1,
  Third = 2,
  Fourth = 3,
  Fifth = 4,
}

export const SLOT_TIME_MAPPING_24H_FORMAT = [
  ["8:30", "10:00"],
  ["10:30", "12:00"],
  ["12:00", "13:30"],
  ["14:00", "15:30"],
  ["16:00", "17:30"],
];

export type KeyStringInverseFunc = (str: string) => [WeekDay, Slot];
export type Sessions = { [key: string]: Session };
export type SessionsIterator = (
  weekDay: WeekDay,
  slot: Slot,
  val: Session
) => void;

export interface Session {
  _id?: any;
  sessionType: SessionType;
  locationName: string; // Names that will be shown in the frontEnd
  instructorName: string;
  courseName: string;
  courseId: any;
  locationId: any;
  instructorId: any;
  studentGroupId: any;
}

export interface FreeSlotsRequest {
  locationId: any;
  instructorId: any;
  studentGroupId: any;
}

export interface WeekSlot {
  slot: Slot;
  weekDay: WeekDay;
}

export class Schedule {
  static keyString = (weekDay: WeekDay, slot: Slot) => `${weekDay},${slot}`; //slot and day of the week are together primary keys, enums are converted to a key string
  static keyStringInverse: KeyStringInverseFunc = (str: string) => {
    //parses the key string back to a Weekday,Slot tuple
    const arr = str.split(",");
    return [parseInt(arr[0]), parseInt(arr[1])];
  };

  protected sessions: Sessions;

  constructor(sessions?: Sessions) {
    this.sessions = sessions || {};
  }

  getSession(week: WeekDay, slot: Slot) {
    return this.sessions[Schedule.keyString(week, slot)];
  }

  forEach(func: SessionsIterator) {
    //arrow function can be passed here to iterate over the sessions, useful for displaying schedules in the frontend

    let weekSlotTuple: [WeekDay, Slot];

    for (const key in this.sessions) {
      weekSlotTuple = Schedule.keyStringInverse(key);
      func(weekSlotTuple[0], weekSlotTuple[1], this.sessions[key]);
    }
  }
}

export class SessionsToBeModified extends Schedule {
  constructor(sessions?: Sessions) {
    super(sessions);
    this.sessions = sessions || {};
  }

  setSession(week: WeekDay, slot: Slot, session: Session) {
    this.sessions[Schedule.keyString(week, slot)] = session;
  }

  getSessions() {
    return this.sessions;
  }
}
