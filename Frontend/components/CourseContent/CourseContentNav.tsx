import React from "react";
import MainButton from "../shared/button/MainButton";
import CourseCTACard from "./CourseCTACard";

type Props = {
  refs: React.RefObject<HTMLDivElement>[];
};

function ScrollTo(myRef: React.RefObject<HTMLDivElement>) {
  if (myRef.current) {
    myRef.current.scrollIntoView({
      behavior: "smooth",
      block: 'center',
    });
  }
}
const CourseContentNav = (props: Props) => {
  return (
    <div className="flex sticky top-0  z-[100] rounded-b-xl  justify-between  items-center px-20 py-4 border-b-3 shadow-sm  text-white bg-navbar">
      <div className="flex gap-10 items-center">
        <p className=" cursor-pointer" onClick={() => ScrollTo(props.refs[0])}>About</p>
        <p className=" cursor-pointer" onClick={() => ScrollTo(props.refs[1])}>Syllabus</p>
        <p className=" cursor-pointer" onClick={() => ScrollTo(props.refs[2])}>Instructor</p>
        <p className=" cursor-pointer" onClick={() => ScrollTo(props.refs[3])}>Reviews</p>
      </div>
      <MainButton HandleClick={() => { }} btnText="Enroll Now" Size="md"></MainButton>

      {/* <CourseCTACard></CourseCTACard> */}
    </div>
  );

};

export default CourseContentNav;
