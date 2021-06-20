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

export type KeyStringInverseFunc = (str: string) => [WeekDay, Slot];
export type Sessions = { [key: string]: Session };
export type SessionsIterator = (key: [WeekDay, Slot], val: Session) => void;

export const keyString = (weekDay: WeekDay, slot: Slot) => `${weekDay},${slot}`; //slot and day of the week are together primary keys, enums are converted to a key string

export const keyStringInverse: KeyStringInverseFunc = (str: string) => {
  //parses the key string back to a Weekday,Slot tuple
  const arr = str.split(",");
  return [parseInt(arr[0]), parseInt(arr[1])];
};

export interface Session {
  _id? : any
  sessionType: SessionType;
  locationName: string;        // Names that will be shown in the frontEnd
  instructorName: string;
  courseName: string;
  courseId: any;
  locationId: any;
  instructorId: any;
  studentGroupId: any;
}


export class Schedule {
  protected sessions: Sessions;

  constructor(sessions?: Sessions) {
    this.sessions = sessions || {};
  }

  forEach(func: SessionsIterator) {
    //arrow function can be passed here to iterate over the sessions, useful for displaying schedules in the frontend

    for (const key in this.sessions)
      func(keyStringInverse(key), this.sessions[key]);
  }

}
