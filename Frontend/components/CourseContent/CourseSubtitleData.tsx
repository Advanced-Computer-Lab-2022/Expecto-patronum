import React from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import { MdOutlineQuiz } from "react-icons/md";

type Props = {
  type: "video" | "Reading" | "Practice exercise";
  Data: string[];
};

const CourseSubtitleData = (props: Props) => {
  return (
    <div className="mt-4 pb-4 border-b-2 ">
      {props.Data.length > 0 && (
        <div>
          <div className="flex gap-2 items-center mb-2">
            {props.type === "video" ? (
              <AiOutlinePlayCircle></AiOutlinePlayCircle>
            ) : props.type === "Reading" ? (
              <BsBook></BsBook>
            ) : (
              <MdOutlineQuiz></MdOutlineQuiz>
            )}
            <p className="font-semibold">
              {props.Data.length} {props.type}
            </p>
          </div>
          <ul className="flex flex-col ml-10 gap-2 list-disc	">
            {props.Data.map((item) => (
              <li className="text-sm">{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseSubtitleData;
