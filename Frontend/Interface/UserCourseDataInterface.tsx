import { CourseInstructorDataInterface } from "./CourseInstructorDataInterface";
import { OneSubtitleData } from "./OneSubtitleData";

export interface UserCourseDataInterface {
  purchased: boolean;
  course: {
    title: string;
    summary: string;
    rating: { 1: number, 2: number, 3: number, 4: number, 5: number, avg: number };
    instructorName: string;
    courseVideo: string;
    courseHours: number;
    level: string;
    price: number;
    discountPrice: number;
    discount: {
      discount: number,
      startDate?: Date,
      duration?: number,
      endDate?: Date,
    };
    subject: string;
    subtitles: [
      OneSubtitleData
    ]
    review?: [{
      username: string,
      reviewBody: string,
      rating: number
    }]

  };

  instructor: CourseInstructorDataInterface;


}
