
export enum SessionType {
  Lecture = 0,
  Tutorial = 1,
}

export interface StudentSession {
  time: Date;
  location: string;
  courseId: string;
  sessionType: SessionType;
}

export interface StudentSchedule {
  studentId: string;
  sessions: StudentSession[];
}
