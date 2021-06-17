export enum SessionType {
  Lecture = 0,
  Tutorial = 1,
}

export interface StudentSession {
  time: Date;
  location: string;
  courseId: number;
  sessionType: SessionType;
}

export interface StudentSchedule {
  studentId: number;
  sessions: StudentSession[];
}
