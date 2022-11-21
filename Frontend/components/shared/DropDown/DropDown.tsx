import Image from "next/image";
import React, { useState } from "react";
import CourseSubtitle from "../../CourseContent/CourseSubtitleData";
import { MdKeyboardArrowDown } from "react-icons/md";

interface InterfaceDropDown {
  FirstItemClicked?: boolean;
  title?: string;
  TextRight?: string;
}

const DropDown: React.FC<InterfaceDropDown> = ({
  FirstItemClicked = false,
}) => {
  const [Clicked, SetClicked] = useState(FirstItemClicked);

  return (
    <div className=" w-1/3 ">
      <div
        onClick={() => SetClicked((prev) => !prev)}
        className="flex justify-between items-center w-full 
           px-2 py-4 bg-navbar cursor-pointer text-white
         border-2 border-sm drop-shadow-lg border-black/10"
      >
        <div className="flex items-center gap-5 ">
          <div
            className={
              Clicked
                ? " w-3 h-3 rotate-180 ease-linear duration-200"
                : "w-3 h-3  ease-linear duration-200  "
            }
          >
            <MdKeyboardArrowDown></MdKeyboardArrowDown>
          </div>
          <p className="text-md font-semibold ">Introduction</p>
        </div>
        <p className="text-md "> 9 Lectures | 40 min</p>
      </div>
      <div
        className={
          Clicked
            ? "opacity-100 ease-linear duration-75 mb-8  mt-4 "
            : "opacity-0 hidden ease-linear duration-75 "
        }
      >
        <div className="ml-4  ">
          <CourseSubtitle></CourseSubtitle>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
