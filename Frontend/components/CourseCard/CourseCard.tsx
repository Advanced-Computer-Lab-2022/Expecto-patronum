import Image from "next/image";
import React from "react";

type Props = {};

const CourseCard = (props: Props) => {
  return (
    <div
      className="bg-cyan-400 w-96 px-10 pt-20 pb-5 mt-20 mx-20  rounded-3xl shadow-lg 
    bg-gradient-to-br from-CardsGradient-YellowL  to-CardsGradient-YellowR"
    >
      <h1 className="text-3xl ">Modern Art and Design</h1>
      <p className="text-sm">Mohamed salem</p>
      <p>Skills you will Gain: Amazon Web Services</p>
      <p>Rating:4.9</p>
      <p>32 Hours|50 lectures</p>
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
  );
};

export default CourseCard;
