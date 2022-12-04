export interface CourseHeroData {
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


}