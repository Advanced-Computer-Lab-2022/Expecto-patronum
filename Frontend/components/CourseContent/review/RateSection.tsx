import React from "react";
import BigRating from "../../shared/rating/BigRating";

type Props = {};

const RateSection = (props: Props) => {
  let precentage = ["80", "20", "0", "0", "0"];
  let arrayTemp = [5, 4, 3, 2, 1];
  return (
    <div className="min-w-[25rem]  px-10">
      <p className="text-2xl font-semibold mb-10  ">Rating</p>
      <div className="flex gap-4 items-center mb-4">
        <p className="text-5xl font-bold">4.8</p>
        <div className="text-center">
          <BigRating RateAction={false} Rate={4.8}></BigRating>
          <p>1300 Rate</p>
        </div>
      </div>
      {arrayTemp.map((item, index) => {
        return (
          <div key={index} className="flex gap-2 items-center mb-2 ">
            <p>{item} stars</p>
            <div className=" w-2/3 bg-gray-200 rounded-sm h-2.5 dark:bg-gray-700">
              <div
                className="bg-yellow-400 h-2.5 "
                style={{ width: precentage[index] + "%" }}
              ></div>
            </div>
            <p>{precentage[index] + "%"}</p>
          </div>
        );
      })}
    </div>
  );
};

export default RateSection;
