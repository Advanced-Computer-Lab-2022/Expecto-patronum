export interface CourseInstructorDataInterface {
  instructorRating: { 1: number, 2: number, 3: number, 4: number, 5: number, avg: number },
  biography?: string,
  firstname: string,
  lastname: string,
}