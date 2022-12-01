import React from "react";
import BigRating from "../../shared/rating/BigRating";

type Props = {
  review: [{
    username: string,
    reviewBody: string,
    rating: number
  }]
};

const ReviewSection = (props: Props) => {
  return (
    <div className="w-1/2">
      <h2 className="mb-8 text-3xl font-semibold">TOP REVIEWS</h2>
      {props.review.map((item, index) => {
        return (
          <div key={index} className="flex-cols px-2 items-start mb-5">
            <BigRating RateAction={false} Rate={item.rating}></BigRating>
            <p className="text-lg mb-2 mt-2">{item.username}</p>
            <p className="w-4/5">
              {item.reviewBody}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewSection;
