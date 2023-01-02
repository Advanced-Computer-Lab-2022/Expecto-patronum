import React from "react";
import MainButton from "../shared/button/MainButton";
import CourseCTACard from "./CourseCTACard";

type Props = {
  refs: React.RefObject<HTMLDivElement>[];
  IsCorp: boolean;
  HandleClick: () => void;
  Purchased: "yes" | "no" | "Pending" | "";
  Loading: boolean;

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

      <MainButton Loading={props.Loading} Type={props.Purchased} btnText={props.IsCorp ? props.Purchased == 'no' ? "Request Course" : props.Purchased == 'Pending' ? "Pending" : "View Course" : props.Purchased === 'no' ? "Enroll Now" : props.Purchased === 'Pending' ? 'Pending' : "View Course"} HandleClick={props.HandleClick} Size='lg'></MainButton>

      {/* <CourseCTACard></CourseCTACard> */}
    </div>
  );

};

export default CourseContentNav;
