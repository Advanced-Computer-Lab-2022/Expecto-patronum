import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CourseContentHero from "../../components/CourseContent/CourseContentHero";
import CourseContentInstructor from "../../components/CourseContent/CourseContentInstructor";
import CourseContentLearn from "../../components/CourseContent/learn/CourseContentLearn";
import CourseContentNav from "../../components/CourseContent/CourseContentNav";
import CourseContentReviews from "../../components/CourseContent/review/CourseContentReviews";

import Navbar from "../../components/shared/Navbar/Navbar";

const Course: NextPage = () => {
  const [NavApear, SetNavApear] = useState(false);

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
        <CourseContentHero SetNavApear={SetNavApear}></CourseContentHero>
      </div>
      <div className="ml-20">
        <div ref={ref2}>
          <CourseContentLearn></CourseContentLearn>
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

export default Course;
