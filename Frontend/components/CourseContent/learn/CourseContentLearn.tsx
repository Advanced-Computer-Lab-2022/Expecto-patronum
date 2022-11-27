import React from "react";
import { CourseLearnData } from "../../../Interface/CourseLearnData";
import CourseSubtitle from "./CourseSubtitle";

type Props = {
  Subtitles:CourseLearnData;
  
  
};

const CourseContentLearn = (props: Props) => {
  return (
    <div className="mt-40 ">
      <h1 className="text-4xl uppercase font-bold mb-20">
        What You Will learn
      </h1>
   
      <div className="flex">
        <div>Line</div>
        <div className="w-1/2">
          {props.Subtitles.Subtitles.map((subtitle,index) => (
             <CourseSubtitle Data={subtitle} key={index}></CourseSubtitle>


          ))}
       
        </div>
      </div>
    </div>
  );
};

export default CourseContentLearn;
