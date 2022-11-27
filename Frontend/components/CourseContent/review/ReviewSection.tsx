import React from "react";
import BigRating from "../../shared/rating/BigRating";

type Props = {};

const ReviewSection = (props: Props) => {
  let arrayTemp = [1, 2, 3];
  return (
    <div className="px-10 ">
      <h2 className="mb-8 text-lg font-semibold">TOP REVIEWS</h2>
      {arrayTemp.map((item, index) => {
        return (
          <div key={index} className="flex-cols items-start mb-5">
            <BigRating Rate={4.8}></BigRating>
            <p className="text-lg mb-2 mt-2">By MS</p>
            <p className="w-4/5">
              Solid "big picture" refresher course before getting into the more
              technical stuff I'm sure down the road, even for folks with
              backgrounds in math and science but haven't used it years
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewSection;
