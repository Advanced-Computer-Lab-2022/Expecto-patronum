export interface CourseHeroData {
    title: string;
    summary: string;
    rating: { one: number, two: number, three: number, four: number, five: number, avg: number };
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


}