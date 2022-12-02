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
import axios from "axios";
import { UserCourseDataInterface } from "../../Interface/UserCourseDataInterface";
import CourseReviewModal from "../../components/CourseContent/review/CourseReviewModal";


const Course: NextPage<{ data: UserCourseDataInterface }> = (props) => {
  const [NavApear, SetNavApear] = useState(false);
  const [ReviewModalOpen, SetReviewModalOpen] = useState(false);

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
        <CourseContentHero courseContentData={CourseHeroData} SetNavApear={SetNavApear}></CourseContentHero>
      </div>
      <div className="ml-20">
        <div ref={ref2}>
          <CourseContentLearn Subtitles={CourseLearnData}></CourseContentLearn>
        </div>
        <div ref={ref3}>
          <CourseContentInstructor instructorData={instructorData} ></CourseContentInstructor>
        </div>
        {
          props.data.course.review && props.data.course.review.length > 0 &&
          <div ref={ref4}>
            <CourseContentReviews SetReviewModalOpen={SetReviewModalOpen} review={props.data.course.review}></CourseContentReviews>
          </div>
        }

      </div>
      {ReviewModalOpen && (<CourseReviewModal SetOpen={SetReviewModalOpen} />)}
    </div >
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let id = context.params?.Courseid;
  let CourseData = await axios.put(ApiUrl + '/user/selectCourse', {
    courseId: id,
  })

  return {
    props: {
      data: CourseData.data,
    },
  };

}


export default Course;
