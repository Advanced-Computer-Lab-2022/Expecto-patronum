import classNames from "classnames";
import React, { useEffect } from "react";
import BigRating from "../../shared/rating/BigRating";
import OneStar from "../../shared/rating/OneStar";
import RateBar from "./RateBar";

type Props = {};

const RateSection = (props: Props) => {
  let [ClickedRate, setClickedRate] = React.useState(0);
  let precentage = ["80", "20", "0", "0", "0"];
  let arrayTemp = [5, 4, 3, 2, 1];
  let Rate = {
    1: 20,
    2: 20,
    3: 20,
    4: 10,
    5: 30,
    avg: 4.9,

  }



  return (
    <div className={Container}>
      {/* <p className="text-2xl font-semibold mb-10  ">Rating</p>
      <div className="flex gap-4 items-center mb-4">
        <p className="text-5xl font-bold">4.8</p>
        <div className="text-center">
          <OneStar rating={4.8} ></OneStar>
          <p>1300 Rate</p>
        </div>
      </div> */}
      {
        arrayTemp.map((item, index) => {
          return (
            <RateBar index={index + 1} Rate={Rate} Clicked={ClickedRate} SetClicked={setClickedRate}></RateBar>
          );
        })
      }
    </div >
  );
};

export default RateSection;

const Container = classNames(" w-1/4 ");
















