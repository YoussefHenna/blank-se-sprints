export class CourseDoesNotExsit extends Error {
  constructor(public message: string) {
    super();
  }
}

export class CourseSameNameAlreadyExists extends Error {
  constructor(public message: string) {
    super();
  }
}

export class AdminDoesNotExist extends Error {
  constructor(public message: string) {
    super();
  }
}
