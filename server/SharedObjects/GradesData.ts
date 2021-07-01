export default interface IData {
  grades: {
    courseId: string;
    name: string;
    grade: string;
    description: string;
    credits: number;
    color: string;
  }[];
  student: {
    name: string;
    username: string;
    faculty: string;
    admissionYear: number;
    semester: number;
  };
}
