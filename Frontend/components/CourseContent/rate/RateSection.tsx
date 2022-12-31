import classNames from "classnames";
import React, { useEffect } from "react";
import BigRating from "../../shared/rating/BigRating";
import OneStar from "../../shared/rating/OneStar";
import RateBar from "./RateBar";

type Props = {
  RatingData: { one: number, two: number, three: number, four: number, five: number, avg: number }
  SetCurrentRate: (index: number) => void;
  CurrentRate: number
};

const RateSection = (props: Props) => {
  let [ClickedRate, setClickedRate] = React.useState(0);
  let precentage = ["80", "20", "0", "0", "0"];
  let arrayTemp = [5, 4, 3, 2, 1];
  let Rate = {
    1: props.RatingData.one,
    2: props.RatingData.two,
    3: props.RatingData.three,
    4: props.RatingData.four,
    5: props.RatingData.five,
    avg: props.RatingData.avg,
  }


  useEffect(() => {
    if (ClickedRate != 0) {

    }

  }, [ClickedRate])


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
            <RateBar index={index + 1} Rate={Rate} Clicked={props.CurrentRate} SetClicked={props.SetCurrentRate}></RateBar>
          );
        })
      }
    </div >
  );
};

export default RateSection;

const Container = classNames(" w-1/4  ");
















