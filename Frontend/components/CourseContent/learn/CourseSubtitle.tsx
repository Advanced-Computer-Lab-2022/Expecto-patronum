import React from "react";
import CourseSubtitleData from "../CourseSubtitleData";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

type Props = {};

const CourseSubtitle = (props: Props) => {
  const [animationParent] = useAutoAnimate<HTMLDivElement>();
  const [onClick, SetonClick] = React.useState(false);
  const [ShowSubtitle, SetShowSubtitle] = React.useState(false);

  return (
    <div className="mb-4 ">
      <div ref={animationParent} className="mb-10  border-b-2">
        <div
          onClick={() => {
            SetShowSubtitle((prev) => !prev);
            SetonClick(false);
          }}
          className="flex justify-between items-center gap-10 mb-4 cursor-pointer"
        >
          <h1 className="text-2xl font-bold">Learn to code</h1>
          <p className="text-sm">10 hours to complete</p>

          <div className={"flex items-center gap-9"}>
            {" "}
            {ShowSubtitle ? <AiOutlineMinus /> : <AiOutlinePlus />}
          </div>
        </div>
        {ShowSubtitle && (
          <div>
            <p className="text-md mb-4 mt-2 ">
              This course will discuss the fundamentals of digital freelancing
              by outlining the benefits and disadvantages of working for
              yourself, as well as the main differences between working as a
              freelancer versus a traditional role. In addition to establishing
              the mindset and skills of a freelancer, this course will teach how
              to market yourself as a freelancer by creating your personal
              business identity and brand, using social media in a strategic way
              to find clients and creating a portfolio website targeted towards
              client acquisition.
            </p>
            <div className="flex items-center gap-4 mb-10">
              <div>Icon</div>
              <p className="text-sm">10 videos,5 documents and 1 quiz</p>
              <p
                onClick={() => {
                  SetonClick((prev) => !prev);
                }}
                className="text-sm text-blue-800 font-bold cursor-pointer"
              >
                {!onClick ? "See All" : "See Less"}
              </p>
            </div>
          </div>
        )}
      </div>
      {onClick && ShowSubtitle && (
        <div className="mb-20">
          <CourseSubtitleData
            type="video"
            Data={[
              "Introduction",
              "Introduction",
              "Introduction",
              "Introduction",
              "Introduction",
              "Introduction",
              "Introduction",
            ]}
          ></CourseSubtitleData>
          <CourseSubtitleData
            type="Reading"
            Data={[
              "Introduction",
              "Introduction",
              "Introduction",
              "Introduction",
            ]}
          ></CourseSubtitleData>
        </div>
      )}
    </div>
  );
};

export default CourseSubtitle;
