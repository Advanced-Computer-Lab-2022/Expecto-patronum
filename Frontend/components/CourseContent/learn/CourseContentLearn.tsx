import React, { useEffect } from "react";
import { CourseLearnData } from "../../../Interface/NotPurchasedCourse/CourseLearnData";
import CourseSubtitle from "./CourseSubtitle";
import { MdOndemandVideo } from "react-icons/md";
import { GrAchievement, GrFormClock } from "react-icons/gr";
import Image from "next/image";
type Props = {
  Subtitles: CourseLearnData;
  refdata: React.RefObject<HTMLDivElement>

};

const CourseContentLearn = (props: Props) => {
  const [OpenFirst, SetOpenFirst] = React.useState(false);


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        SetOpenFirst(true);
      }
    }, { threshold: 0.5 });
    if (props.refdata.current) {
      observer.observe(props.refdata.current);
    }


  }, [])


  return (
    <div ref={props.refdata} className="mt-40 flex justify-between ">
      <div className="w-1/2">
        <div className="text-4xl transition-all uppercase font-bold mb-20">
          What You Will learn
          <span className={"block  l transition-all  delay-100 duration-1000 h-2 bg-calm-red   max-w-0" + " " + (OpenFirst && "max-w-[60%]")}></span>

        </div>
        <div >
          {props.Subtitles.subtitles.map((subtitle, index) => (
            <CourseSubtitle index={index} OpenFirst={OpenFirst} Data={subtitle} key={index}></CourseSubtitle>

          ))}

        </div>
      </div>
      <div className="w-1/5 z-50 mr-20 animate-FlyAnim relative">
        <div className="w-full z-10 flex flex-col items-center text-white justify-center rounded-br-full shadow-lg text-w  text-xl  h-80 bg-Dark">
          <ul className="mr-20">
            <li className="flex items-center gap-2 mb-4 ">
              <MdOndemandVideo />
              <p>15 videos</p>
            </li>

            <li className=" flex items-center gap-2 mb-4">
              <MdOndemandVideo />
              <p>20 hours</p>
            </li>
            <li className="flex items-center gap-2 mb-4">
              <MdOndemandVideo />
              <p>Certifcate</p>
            </li>
          </ul>

        </div>

        <div className="w-10  h-10 top-[-2rem]   shadow-calm-red   z-last rotate-180 absolute left-[-1.5rem]">
          <Image fill className="object-contain " src={"/images/Circle3.png"} alt="Image"></Image>
        </div>
        <div className="w-10  h-10 top-[-2rem]   z-last  rotate-45 absolute right-[-1.3rem]">
          <Image fill className="object-contain " src={"/images/Circle3.png"} alt="Image"></Image>
        </div>
        <div className="w-10  h-10 top-[19.5rem]      z-last rotate-45  absolute left-[-1.8rem]">
          <Image fill className="object-contain " src={"/images/Circle3.png"} alt="Image"></Image>
        </div>
      </div>
    </div >
  );
};

export default CourseContentLearn;
