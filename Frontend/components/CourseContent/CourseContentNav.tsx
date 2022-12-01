import React from "react";
import CourseCTACard from "./CourseCTACard";

type Props = {
  refs: React.RefObject<HTMLDivElement>[];
};

function ScrollTo(myRef: React.RefObject<HTMLDivElement>) {
  if (myRef.current) {
    myRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}
const CourseContentNav = (props: Props) => {
  return (
    <div className="flex sticky top-0 z-10  gap-10 items-center px-20 py-4 border-b-3 shadow-sm  text-white bg-navbar">
      <p onClick={() => ScrollTo(props.refs[0])}>About</p>
      <p onClick={() => ScrollTo(props.refs[1])}>Syllabus</p>
      <p onClick={() => ScrollTo(props.refs[2])}>Instructor</p>
      <p onClick={() => ScrollTo(props.refs[3])}>Reviews</p>
      <CourseCTACard></CourseCTACard>
    </div>
  );

};

export default CourseContentNav;
