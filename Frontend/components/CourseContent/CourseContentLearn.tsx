import React from "react";
import CourseSubtitle from "./CourseSubtitle";

type Props = {};

const CourseContentLearn = (props: Props) => {
  return (
    <div className="mt-40 ml-20">
      <h1 className="text-4xl mb-20 ">What will You learn</h1>
      <div className="flex">
        <div>Line</div>
        <div>
          <CourseSubtitle></CourseSubtitle>
          <CourseSubtitle></CourseSubtitle>
          <CourseSubtitle></CourseSubtitle>
        </div>
      </div>
    </div>
  );
};

export default CourseContentLearn;
