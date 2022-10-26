import Image from "next/image";
import React, { useState } from "react";
import Rating from "../shared/rating/Rating";

type Props = {};

const CourseCard = (props: Props) => {
  const [Flag, SetFlag] = useState(false);
  return (
    <div
      onMouseEnter={() => {
        SetFlag(true);
      }}
      onMouseLeave={() => {
        SetFlag(false);
      }}
      className=" w-96 h-[28rem] px-10 pt-10  mt-20 mx-20   relative rounded-3xl shadow-lg 
    bg-gradient-to-br from-amber-400/90  to-amber-300/90 
     ... cursor-pointer"
    >
      <div
        className={
          !Flag
            ? " absolute ease-linear duration-200 opacity-0"
            : " absolute ease-linear duration-200 opacity-100 mt-20"
        }
      >
        <h1 className="text-xl w-4/5   mb-4  font-bold line-clamp-2">
          About Modern Art and Design
        </h1>
        <p className="text-md  mb-10 leading-relaxed line-clamp-5 ">
          Professional Professional Web Development Learn how to build
          high-quality websites and dynamic applications to create …
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
           absolute top-0 right-0 w-20 h-10 shadow-xl ease-in duration-300 
           hover:shadow-sm flex items-center justify-center rounded-b-lg "
        >
          <Rating></Rating>
        </div>
        <div className="bg-white/60 inline-block text-center px-5 py-1 font-bold uppercase rounded-md mb-10">
          Foundation
        </div>
        <h1 className="text-4xl w-4/5 font-bold line-clamp-2">
          Modern Art and Design
        </h1>
        <p className="text-xs  text-black/90 mb-4 mt-1 ">Mohamed salem</p>
        <p className="text-md mb-2 line-clamp-2 ">
          <span className="text-md  font-medium ">Skills you will Gain:</span>
          Computer Programming, Python Programming, Statistical Programming,
          Data Management, SQL, Databases, Extract, Transform, Load, Computer
          Networking, Network Model, Other Programming Languages, Computational
          Logic, Computer Programming Tools, Data Structures, Javascript,
          Natural Language Processing, Programming Principles, Software
          Architecture, Software Engineering, Theoretical Computer Science, Web
          Development
        </p>
        <p className="text-sm text-black/90  ">32 hours | 50 lectures</p>
        <div className="flex w-100 justify-end">
          <div className="w-36 ">
            <Image
              src="/images/Brush.png"
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
