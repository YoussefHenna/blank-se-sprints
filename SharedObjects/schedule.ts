
export enum SessionType {
  Lecture = 0,
  Tutorial = 1,
}

export interface StudentSession {
  time: Date;
  location: string;
  courseId: any;
  sessionType: SessionType;
}

export class StudentSchedule {

  constructor (
    private studentId: any,
    private sessions: StudentSession[],
  ){}

  getSessions(){
    return this.sessions
  }

  getStudentId(){
    return this.studentId
  }


}
