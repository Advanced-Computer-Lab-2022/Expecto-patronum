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
import { CourseHeroData } from "../../Interface/NotPurchasedCourse/CourseHeroData";
import { CourseLearnData } from "../../Interface//NotPurchasedCourse/CourseLearnData";
import axios from "axios";
import { UserCourseDataInterface } from "../../Interface/NotPurchasedCourse/UserCourseDataInterface";
import CourseReviewModal from "../../components/CourseContent/review/CourseReviewModal";
import { AES, enc } from "crypto-js";


const Course: NextPage<{ data: UserCourseDataInterface }> = (props) => {
  const [NavApear, SetNavApear] = useState(false);
  const [ReviewModalOpen, SetReviewModalOpen] = useState(false);


  console.log(props.data.course)
  const CourseHeroData: CourseHeroData = {
    title: props.data.course.title,
    summary: props.data.course.summary,
    rating: props.data.course.rating,
    instructorName: props.data.course.instructorName,
    courseVideo: props.data.course.courseVideo,
    courseHours: props.data.course.courseHours,
    level: props.data.course.level,
    price: props.data.course.price,
    discountPrice: props.data.course.discountPrice,
    discount: props.data.course.discount,
    subject: props.data.course.subject,

  }

  const CourseLearnData: CourseLearnData = {
    subtitles: props.data.course.subtitles,

  }

  const instructorData = {
    instructorRating: props.data.instructor.instructorRating,
    biography: props.data.instructor?.biography,
    firstname: props.data.instructor.firstname,
    lastname: props.data.instructor.lastname,

  }
  const RatingData: { one: number, two: number, three: number, four: number, five: number, avg: number } = props.data.course.rating



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


      <div className="overflow-hidden">
        <div ref={ref1}>
          <CourseContentHero courseContentData={CourseHeroData} SetNavApear={SetNavApear}></CourseContentHero>
        </div>
        <div className="ml-20">
          <div >
            <CourseContentLearn refdata={ref2} Subtitles={CourseLearnData}></CourseContentLearn>
          </div>
          <div >
            <CourseContentInstructor refdata={ref3} instructorData={instructorData} ></CourseContentInstructor>
          </div>
          {
            props.data.course.review && props.data.course.review.length > 0 &&
            <div ref={ref4}>
              <CourseContentReviews SetReviewModalOpen={SetReviewModalOpen} review={props.data.course.review}></CourseContentReviews>
            </div>
          }
        </div>
        {ReviewModalOpen && (<CourseReviewModal RatingData={RatingData} SetOpen={SetReviewModalOpen} />)}
      </div>

    </div >
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let id = context.params?.Courseid;
  const decryptId = (str: string) => {
    const decodedStr = decodeURIComponent(str);
    return AES.decrypt(decodedStr, 'secretPassphrase').toString(enc.Utf8);
  }
  const decryptedId = decryptId(typeof id === 'string' ? id : "");
  console.log(decryptedId)

  let CourseData = await axios.put(ApiUrl + '/User/selectCourse', {
    courseId: decryptedId,
  })

  return {
    props: {
      data: CourseData.data,
    },
  };

}


export default Course;
