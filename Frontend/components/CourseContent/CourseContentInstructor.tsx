import Image from "next/image";
import React, { useEffect } from "react";
import { MdOndemandVideo } from "react-icons/md";
import { GrAchievement, GrFormClock } from "react-icons/gr";
import { CourseInstructorDataInterface } from "../../Interface//NotPurchasedCourse/CourseInstructorDataInterface";
import OneStar from "../shared/rating/OneStar";
type Props = {
  instructorData: CourseInstructorDataInterface
  refdata: React.RefObject<HTMLDivElement>

};


const CourseContentInstructor = (props: Props) => {
  const [Animate, SetAnimate] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        SetAnimate(true);
      }
    }, { threshold: 0.5 });
    if (props.refdata.current) {
      observer.observe(props.refdata.current);
    }


  }, [])
  console.log(Animate)
  return (
    <div className=" my-52 ">
      <div className="flex justify-between items-center w-full pr-10">
        <div className={" " + (Animate ? "opacity-1 animate-FlyInLeftAnim" : "opacity-0")} >
          <h1 className="text-4xl mb-10 font-semibold">Instructor</h1>

          <h1 className="text-2xl ml-5 mb-4">{props.instructorData.firstname} {props.instructorData.lastname}</h1>

          <div className="flex  gap-10 mb-5">
            <div className="rounded-full w-24  h-24 bg-red-200 ">
              <Image
                src="/images/Trophy.png"
                width={45}
                height={45}
                alt={"CGP"}
                objectFit="contain"
                layout="responsive"
                priority
              />
            </div>
            <ul>
              <li className="flex items-center gap-2 mb-2 ">
                <OneStar rating={props.instructorData.instructorRating?.avg}></OneStar>
              </li>

              <li className="flex items-center gap-2 mb-2">
                <GrFormClock />
                <p>123000 students</p>
              </li>
              <li className="flex items-center gap-2 mb-2">
                <GrAchievement />
                <p>40 Courses</p>
              </li>
            </ul>
          </div>
          <p ref={props.refdata} className="w-1/2">
            {props.instructorData.biography && props.instructorData.biography}
          </p>
        </div>
        <div className={" w-[30rem] h-[30rem] flex justify-center items-center   relative" + " " + (Animate ? " visible animate-FlyInRightAnim " : "hidden")}>
          <Image fill className="object-contain  " src={"/images/Student2.png"} alt="Image"></Image>
          <div className=" h-[10rem] z-50 flex items-center justify-center  rounded-full">
            <p className="text-4xl font-bold text-white">Learn from the Best</p>
          </div>
          <div className="w-10  h-10 top-[0rem]  right-[9rem]  shadow-calm-red   z-50 rotate-[60deg] absolute ">
            <Image fill className="object-contain " src={"/images/Circle3.png"} alt="Image"></Image>
          </div>
          <div className="w-10  h-10 bottom-[0rem]  right-[8rem]  shadow-calm-red   z-50 rotate-[180deg] absolute ">
            <Image fill className="object-contain " src={"/images/Circle3.png"} alt="Image"></Image>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CourseContentInstructor;
