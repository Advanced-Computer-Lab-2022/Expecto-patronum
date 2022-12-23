export interface AllCourseDataInterface {

  discount: {
    discount: number
  },
  rating: {
    one: number,
    two: number,
    three: number,
    four: number,
    five: number,
    avg: number
  },
  promotion: {
    promotion: number
  },
  level: string,
  purchases: number,
  _id: string,
  instructorID: string,
  title: string,
  summary: string,
  subtitles:
  {
    _id: string,
    header: string,
    contents: {
      _id: string,
      video: string,
      preview: boolean,
      duration: number,
      description: string
    }[],
    exercise: [{
      exerciseID: string,
      exerciseName: string
    }] | [],
    totalMinutes: number
  }[],
  subject: string,
  price: number,
  courseHours: number,
  courseVideo: string,
  instructorName: string,
  discountPrice: number,
  review: [],
  courseImage: string,
  __v: number,
  finalExam: number
}

