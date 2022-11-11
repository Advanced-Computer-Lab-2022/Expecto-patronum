import React from "react";
import CourseSubtitle from "./CourseSubtitle";

type Props = {};

const CourseContentLearn = (props: Props) => {
  return (
    <div className="mt-40 ">
      <h1 className="text-4xl uppercase font-bold mb-20">
        What You Will learn
      </h1>
      <p className="text-3xl mb-2 ">Robotics Software Engineer</p>
      <p className="mb-3">4 months to complete</p>
      <p className="text-md mb-20 w-1/2 ">
        Begin your exploration into the world of robotics software engineering
        with a practical, system-focused approach to programming robots using
        the ROS framework and C++. In addition, learn and apply robotics
        software engineering algorithms such as localization, mapping, and
        navigation.
      </p>
      <div className="flex">
        <div>Line</div>
        <div className="w-1/2">
          <CourseSubtitle></CourseSubtitle>
          <CourseSubtitle></CourseSubtitle>
          <CourseSubtitle></CourseSubtitle>
        </div>
      </div>
    </div>
  );
};

export default CourseContentLearn;
