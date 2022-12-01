import Image from "next/image";
import React from "react";
import { MdOndemandVideo } from "react-icons/md";
import { GrAchievement, GrFormClock } from "react-icons/gr";
import { CourseInstructorDataInterface } from "../../Interface/CourseInstructorDataInterface";
import OneStar from "../shared/rating/OneStar";
type Props = {
  instructorData: CourseInstructorDataInterface

};

const CourseContentInstructor = (props: Props) => {
  return (
    <div className="my-40">
      <h1 className="text-4xl mb-10 font-semibold">Instructor</h1>
      <h1 className="text-2xl ml-5 mb-4">{props.instructorData.firstname} {props.instructorData.lastname}</h1>

      <div className="flex  gap-10 mb-5">
        <div className="rounded-full w-24  h-24 bg-red-200 ">
          <Image
            src="/images/Trophy.png"
            width={45}
            height={45}
            alt={"CGP"}
            objectFit="contain"
            layout="responsive"
            priority
          />
        </div>
        <ul>
          <li className="flex items-center gap-2 mb-2 ">
            <OneStar rating={props.instructorData.instructorRating.avg}></OneStar>
          </li>

          <li className="flex items-center gap-2 mb-2">
            <GrFormClock />
            <p>123000 students</p>
          </li>
          <li className="flex items-center gap-2 mb-2">
            <GrAchievement />
            <p>40 Courses</p>
          </li>
        </ul>
      </div>
      <p className="w-1/2">
        {props.instructorData.biography && props.instructorData.biography}
      </p>
    </div>
  );
};

export default CourseContentInstructor;
