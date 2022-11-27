import { CourseVideoData } from "./CourseVideoData";

export interface OneSubtitleData{
    header: String,
    summary: String,
    contents: [CourseVideoData],
    exercise: {
      exerciseTitle: String,
      questions: [{
        question: String,
        choices: [String],
        answer: String,
        isVisible: Boolean,
      }],
      totalGrade: number
    },
    totalMinutes: number,
  }
