import { CourseVideoData } from "./CourseVideoData";

export interface OneSubtitleData {
  _id: string,
  header: string,
  summary: string,
  contents: [CourseVideoData],
  exercises?: {
    exerciseTitle: string,
  },
  totalMinutes: number,



}
