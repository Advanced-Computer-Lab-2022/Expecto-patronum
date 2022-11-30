import { CourseVideoData } from "./CourseVideoData";

export interface OneSubtitleData{
    header: String,
    summary: String,
    contents: [CourseVideoData],
    exercise: {
      exerciseTitle: String,
    },
    totalMinutes: number,
  }
