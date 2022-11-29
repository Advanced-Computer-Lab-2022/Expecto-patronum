import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../context/DataContext";
import OneStar from "../shared/rating/OneStar";
import { CourseData } from "../../Interface/CourseDataInterface";
import { useRouter } from "next/router";

const CourseCard: React.FC<{ CourseData: CourseData }> = ({ CourseData }) => {
  const {
    rating,
    discount,
    discountPrice,
    _id,
    title,
    summary,
    subject,
    price,
    courseHours,
    instructorName,
  } = CourseData;

  const [Flag, SetFlag] = useState(false);
  const { Rate, SetRate } = useContext(DataContext);
  let router=useRouter()
  

  return (
    <div
    onClick={() => {router.push(`/Courses/${_id}`)}}
      onMouseEnter={() => {
        SetFlag(true);
      }}
      onMouseLeave={() => {
        SetFlag(false);
      }}
      className=" h-[28rem] px-10 pt-10 relative rounded-3xl shadow-lg 
    bg-gradient-to-br from-amber-400/90  to-amber-300/90 
     ... cursor-pointer"
    >
      <div
        className={
          !Flag
            ? " absolute ease-linear duration-200 opacity-0  ml-[-10px] pr-10"
            : " absolute ease-linear duration-200 opacity-100 mt-4 ml-[-10px] pr-10"
        }
      >
        <h1 className="text-xl w-4/5   mb-4  font-bold line-clamp-4">
          About Modern {title}
        </h1>
        <p className="text-md mb-10 leading-relaxed  line-clamp-4 ">
          {summary}
        </p>
        <p>Know more</p>
      </div>

      <div
        className={
          !Flag
            ? "ease-linear duration-200 opacity-100"
            : "ease-linear duration-200 opacity-0"
        }
      >
        <div
          className="bg-white 
           absolute top-0 right-0 w-14 h-10 shadow-xl ease-in duration-300 
           hover:shadow-sm flex items-center justify-center rounded-b-lg "
        >
          <OneStar rating={rating.avg}></OneStar>
        </div>
        <div className="bg-white/60 inline-block text-center px-3 py-1 font-bold uppercase rounded-md mb-10">
          Beginner
        </div>
        <h1 className="text-4xl w-4/5 font-bold line-clamp-2">{title}</h1>
        <p className="text-xs  text-black/90 mb-4 mt-1 ">{instructorName}</p>
        <p className="text-md mb-2 line-clamp-2 ">
          <span className="text-md  font-medium ">
            Skills you will Gain:{summary}
          </span>
        </p>
        <p className="text-sm text-black/90  ">{courseHours / 60} hours</p>
        <p className="text-sm text-black font-bold  ">
          {Math.floor(price * Rate.rate)}
          {Rate.curr}
        </p>
        <div className="absolute bottom-0 right-10">
          <div className="w-32 ">
            <Image
              src="https://i.ibb.co/kqgnCrP/Brush.png"
              width={45}
              height={45}
              alt={"CGP"}
              objectFit="contain"
              layout="responsive"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
