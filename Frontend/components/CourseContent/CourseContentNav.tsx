import React from "react";

type Props = {};

const CourseContentNav = (props: Props) => {
  return (
    <div className="flex sticky top-0 justify-between px-20 py-4 border-b-3 shadow-sm z-10 text-white bg-navbar">
      <p>Course Name</p>
      <button>Start Course</button>
    </div>
  );
};

export default CourseContentNav;
