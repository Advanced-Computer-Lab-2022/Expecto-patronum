import type { GetServerSidePropsContext, NextPage } from "next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CourseContentHero from "../../components/CourseContent/CourseContentHero";
import CourseContentInstructor from "../../components/CourseContent/CourseContentInstructor";
import CourseContentLearn from "../../components/CourseContent/learn/CourseContentLearn";
import CourseContentNav from "../../components/CourseContent/CourseContentNav";
import CourseContentReviews from "../../components/CourseContent/review/CourseContentReviews";
import Navbar from "../../components/shared/Navbar/Navbar";
import { useRouter } from "next/router";
import { ApiUrl } from "../../constants/constants";
import { CourseHeroData } from "../../Interface/CourseHeroData";
import { CourseLearnData } from "../../Interface/CourseLearnData";




interface CourseData {
  data: {
    title: String;
    courseImage: String;
    summary: String;
    price: number;
    discountPrice: number;
    discount: number;
    startDate: Date,
    duration: number,
    endDate: Date,
    subject: String;
    skills: String;
    level: String;
    instructorName:String;
    instructorID:String;
    courseHours: number
    subtitles: [{
      header: String,
      summary: String,
      contents: [{
        contentTitle: String,
        video: String,
        preview: Boolean,
        duration: number,
        description: String,
      }],
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
    }],
    finalExam: {
      questions: [{
        question: String,
        choices: [String],
        answer: String,
        isVisible: Boolean,
      }],
      finalGrade: number,
    },
    rating: {
      one: number,
      two: number,
      three: number,
     four: number,
      five: number,
      avg: number,
    },
    review:[{
      username:String,
      reviewBody:String,
      rating:number
    }]

  
    },
  
   
  
}
const Course: NextPage<CourseData> = (props) => {
  const [Helper, SetHelper] = useState(false);
  const [NavApear, SetNavApear] = useState(false);
  const CourseHeroData:CourseHeroData={
    Title: props.data.title,
    Summary: props.data.summary,
    Rate: props.data.rating.avg,
    InstructorName: props.data.instructorName,
    PreviewVideo: props.data.subtitles[0].contents[0].video,
    TotalHours: props.data.courseHours,
    Level: props.data.level,
    Price: props.data.price,
    DiscountPrice: props.data.discountPrice,
    Discount: props.data.discount,
    Subject: props.data.subject,

  }

  const CourseLearnData:CourseLearnData={
    Subtitles: props.data.subtitles,

  }

  

  let ref1 = useRef<HTMLDivElement>(null);
  let ref2 = useRef<HTMLDivElement>(null);
  let ref3 = useRef<HTMLDivElement>(null);
  let ref4 = useRef<HTMLDivElement>(null);
  let ref5 = useRef<HTMLDivElement>(null);

  return (
    <div>
      {NavApear && (
        <CourseContentNav
          refs={[ref1, ref2, ref3, ref4, ref5]}
        ></CourseContentNav>
      )}

      <div ref={ref1}>
        <CourseContentHero  courseContentData={CourseHeroData}  SetNavApear={SetNavApear}></CourseContentHero>
      </div>
      <div className="ml-20">
        <div ref={ref2}>
          <CourseContentLearn Subtitles={CourseLearnData}></CourseContentLearn>
        </div>
        <div ref={ref3}>
          <CourseContentInstructor></CourseContentInstructor>
        </div>
        <div ref={ref4}>
          <CourseContentReviews></CourseContentReviews>
        </div>
      </div>

      {/* <img style={{ width: "100%" }} src="/images/3azama.jpg" /> */}
    </div>
  );
};

export async function getServerSideProps(context:GetServerSidePropsContext) {
  let id=context.params?.Courseid;
  let res = await fetch(ApiUrl + `/Courses/GetCourse?id=${id}`);
  let CoursesData = await res.json();
  return {
    props: {
      data: CoursesData[0],
    },
  };
}


export default Course;
