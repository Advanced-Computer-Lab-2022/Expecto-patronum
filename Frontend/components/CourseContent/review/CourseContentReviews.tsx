import React from "react";
import RateSection from "./RateSection";
import ReviewSection from "./ReviewSection";

type Props = {};

const CourseContentReviews = (props: Props) => {
  return (
    <div className=" my-40 ">
      <div className="flex gap-20 pt-20 ">
        <RateSection></RateSection>
        <ReviewSection></ReviewSection>
      </div>
      <div className="flex justify-center">
        <button className="px-4 py-2 border-2 rounded-md mt-4">
          Show more
        </button>
      </div>
    </div>
  );
};

export default CourseContentReviews;
