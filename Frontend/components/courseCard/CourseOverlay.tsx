import React from "react";

type Props = {};
const CourseOverlay = (props: Props) => {
  return (
    <div
      className={
        "opacity-0 hover:opacity-100 w-96 h-[28rem] absolute top-0 bottom-0 left-0 right-0 ease-linear duration-300 bg-red "
      }
    >
      <h1 className="text-xl w-4/5   mb-4  font-bold line-clamp-2">
        About Modern Art and Design
      </h1>
      <p className="text-md  mb-10 leading-relaxed line-clamp-5 ">
        Computer Programming, Python Programming, Statistical Programming, Data
        Management, SQL, Databases, Extract, Transform, Load, Computer
        Networking, Network Model, Other Programming Languages, Computational
        Logic, Computer Programming Tools, Data Structures, Javascript, Natural
        Language Processing, Programming Principles, Software Architecture,
        Software Engineering, Theoretical Computer Science, Web Development
      </p>
      <p>Know more</p>
    </div>
  );
};

export default CourseOverlay;
