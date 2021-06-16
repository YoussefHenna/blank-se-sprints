export enum SessionType{
  Lecture = 0,
  Tutorial = 1,
}

export interface StudentSession{
  time : Date,
  location : string,
  courseID : number,
  sessionType : SessionType
}

export class StudentSchedule{
  private studentID : number
  private sessions : StudentSession[]
}
