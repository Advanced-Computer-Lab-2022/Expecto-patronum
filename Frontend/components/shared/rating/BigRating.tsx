import Rate from "rc-rate";
import React from "react";
import 'rc-rate/assets/index.css';

type Props = {
  Rate: number;
  RateAction: boolean;
  Setter?: (value: number) => void;
  Hover?: (value: number) => void;
  className?: string,
  size?: number
};

const BigRating = (props: Props) => {
  let stars = [1, 2, 3, 4, 5];

  function OnChange(v: number) {
    props.Setter!(v);
  }

  return (
    <Rate
      className={props.className}
      disabled={!props.RateAction}
      value={props.Rate}

      onHoverChange={props.Hover ? props.Hover : undefined}
      onChange={props.Setter ? OnChange : undefined}
      style={{ fontSize: props.size ? props.size : 30 }}
      allowHalf
      allowClear={false}
    />
    // <ul className="flex ">
    //   {stars.map((star, index) => {
    //     return (
    //       <li key={index}>
    //         <svg
    //           aria-hidden="true"
    //           className={
    //             props.Rate > index
    //               ? "w-6 h-6 text-yellow-500"
    //               : "w-6 h-6 text-gray-300 dark:text-gray-500"
    //           }
    //           fill="currentColor"
    //           viewBox="0 0 20 20"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <title>{index+1} stars</title>
    //           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    //         </svg>
    //       </li>
    //     );
    //   })}
    // </ul>
  );
};

export default BigRating;
