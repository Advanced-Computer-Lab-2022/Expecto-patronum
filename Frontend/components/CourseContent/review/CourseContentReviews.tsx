import React from "react";
import RateSection from "../rate/RateSection";
import ReviewSection from "./ReviewSection";

type Props = {
  review: {
    username: string,
    reviewBody: string,
    rating: number
  }[]
  SetReviewModalOpen: (value: boolean) => void

};


const CourseContentReviews = (props: Props) => {
  console.log(props.review.length)


  return (
    <div className=" my-40 ">
      <div className="flex gap-20 pt-20 ">
        {<ReviewSection review={props.review}></ReviewSection>}
      </div>
      <div className="flex justify-start">
        {props.review.length == 3 && <button onClick={() => { props.SetReviewModalOpen(true) }} className="px-4 py-2 border-2 rounded-md mt-4">
          Show more
        </button>}

      </div>
    </div>
  );
};

export default CourseContentReviews;
