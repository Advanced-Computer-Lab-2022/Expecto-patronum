import { CourseVideoData } from "./CourseVideoData";

export interface OneSubtitleData {
  header: string,
  summary: string,
  contents: [CourseVideoData],
  exercises?: {
    exerciseTitle: string,
  },
  totalMinutes: number,
}
