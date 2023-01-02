import classNames from "classnames";
import React from "react";
import MainButton from "../../shared/button/MainButton";
import BigRating from "../../shared/rating/BigRating";
import ReviewCard from "./ReviewCard";

type Props = {
  review: {
    username: string,
    reviewBody: string,
    rating: number
  }[]
  ViewMore?: boolean
};

const ReviewSection = (props: Props) => {

  return (
    <div className=" w-full">
      {!props.ViewMore && <h2 className="mb-8 text-3xl font-semibold">REVIEWS</h2>}
      {props.review.map((review, index) => {
        return (
          <ReviewCard key={index} review={review}></ReviewCard>
        );
      })}
      {/* {props.ViewMore && <MainButton btnText="View More Reviews" Size="lg" HandleClick={() => { }} ></MainButton>} */}
    </div>
  );
};

export default ReviewSection;
const Button = classNames("bg-canadian-red text-white px-4 py-2 rounded-md w-1/3 ml-auto mr-auto block")