import React, { useEffect } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import { MdOutlineQuiz } from "react-icons/md";
import { CourseVideoData } from "../../Interface/NotPurchasedCourse/CourseVideoData";

type Props = {
  Data: [CourseVideoData];
};

const CourseSubtitleData = (props: Props) => {
  return (
    <div className="mt-4 pb-4 border-b-2 ">
      {props.Data.length > 0 && (
        <div>
          <div className="flex gap-2 items-center mb-4">
            <BsBook></BsBook>
            <p className="font-semibold">
              {props.Data.length} Content
            </p>
          </div>
          <ul className="flex flex-col ml-10 gap-6 list-disc	">
            {props.Data.map((item, index) => (
              <div className="flex justify-between">
                <li key={index} className="text-md">{item.contentTitle}</li>
                <p className="text-sm">{item.duration} min</p>
              </div>
            ))}

          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseSubtitleData;
