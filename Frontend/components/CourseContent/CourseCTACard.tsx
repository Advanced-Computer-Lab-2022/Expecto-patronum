import React, { useEffect } from "react";
import { MdOndemandVideo } from "react-icons/md";
import { GrAchievement, GrFormClock } from "react-icons/gr";
type Props = {};

const CourseCTACard = (props: Props) => {
  const [Apear, setApear] = React.useState(false);
  useEffect(() => {
    let timer = setTimeout(() => {
      setApear(true);
    }, 1000);
    const Timeout = {};
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={
        Apear
          ? "min-w-[25vw] max-w-[30vw] transition-opacity ease-in-out  opacity-1 text-black bg-white  rounded-lg shadow-md absolute right-32 top-2 px-4 py-10 z-30"
          : "min-w-[25vw] max-w-[30vw] opacity-0  text-black bg-white  rounded-lg shadow-md absolute right-32 top-2 px-4 py-10 z-30"
      }
    >
      <h1 className="text-4xl  font-bold mb-2">$2000</h1>
      <div className="flex justify-center w-100 bg-blue-500 py-3  hover:bg-blue-600 rounded-md">
        <button className="text-xl">Enroll Now</button>
      </div>
      <div>
        <h1 className="mt-4 mb-2 ">Course Content</h1>
        <div>
          <ul>
            <li className="flex items-center gap-2 mb-2 ">
              <MdOndemandVideo color="black" />
              <p>15 videos</p>
            </li>

            <li className="flex items-center gap-2 mb-2">
              <GrFormClock />
              <p>20 hours</p>
            </li>
            <li className="flex items-center gap-2 mb-2">
              <GrAchievement />
              <p>Certifcate</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseCTACard;
