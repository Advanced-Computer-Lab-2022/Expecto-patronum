export interface CourseData {
  rating: { one: number, two: number, three: number, four: number, five: number, avg: number };
  discount: { discount: number };
  _id: string;
  title: string;
  summary: string;
  price: number;
  discountPrice: number;
  subject: string;
  instructorName: string;
  courseHours: number;
  level: string;
  purchases: number;
}
