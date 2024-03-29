import classNames from "classnames";
import React from "react";

type Props = {
  rating: number;
  size?: "sm" | "md" | "lg";
  className?: any,
};

const OneStar = (props: Props) => {
  return (
    <div className={Container + ` ${props.className} ` + (props.size === "lg" ? "text-2xl" : props.size === "md" ? "text-xl" : "text-lg")}>
      <svg
        aria-hidden="true"
        className={"text-yellow-400" + " " + (props.size === "lg" ? StarSizelg : props.size === "md" ? StarSizemd : StarSizesm)}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Rating star</title>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
      <p className="ml-2 text-sm font-bold text-black/90">{props.rating ? props.rating.toFixed(1) : 1}</p>
    </div>
  );
};

export default OneStar;
const Container = classNames("flex items-center");
const StarSizesm = classNames("w-5 h-5");
const StarSizemd = classNames("w-10 h-10");
const StarSizelg = classNames("w-20 h-20");
