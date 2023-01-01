import { WindowSharp } from "@mui/icons-material";
import classNames from "classnames";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player/youtube";
import { CourseHeroData } from "../../Interface/NotPurchasedCourse/CourseHeroData";
import MainButton from "../shared/button/MainButton";
import OneStar from "../shared/rating/OneStar";
import VideoPlayer from "../shared/Video/VideoPlayer";

type Props = {
  SetNavApear: Function;
  courseContentData: CourseHeroData;




};



const CourseContentHero = (props: Props) => {
  const listInnerRef = useRef(null);
  const [VideoPictureApear, SetVideoPictureApear] = React.useState(false);
  const [VideoOpen, SetVideoOpen] = React.useState(false);

  // useEffect(() => {
  //   var path = document.getElementById("path");
  //   var length = path.getTotalLength();
  //   // The start position of the drawing
  //   path.style.strokeDasharray = length;

  //   // Hide the triangle by offsetting dash. Remove this line to show the triangle before scroll draw
  //   path.style.strokeDashoffset = length;

  //   // Find scroll percentage on scroll (using cross-browser properties), and offset dash same amount as percentage scrolled
  //   window.addEventListener("scroll", myFunction);


  //   function myFunction() {
  //     var scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

  //     var draw = length * scrollpercent;

  //     // Reverse the drawing (when scrolling upwards)
  //     path.style.strokeDashoffset = length - draw;
  //   }
  // }, [])
  const onScroll = () => {
    if (listInnerRef.current) {
      const { offsetHeight, scrollHeight } = listInnerRef.current;
      if (window.scrollY >= offsetHeight + 300) {
        props.SetNavApear(true);
      } else {
        props.SetNavApear(false);
      }
    }
  };


  function onclick(e: any) {
    e.preventDefault();
    SetVideoOpen(true);
    SetVideoPictureApear(false);

  }

  useEffect(() => {
    SetVideoPictureApear(true)
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  if (props.courseContentData) {
    return (
      <div >
        <div ref={listInnerRef} className={Container}>
          {/* <svg className=" ml-4 fixed inline-block  h-[100%]" viewBox="0 0 1652 834" fill="none" preserveAspectRatio="xMidYMax meet">
          <path id="path" d="M9 0V378C44.1667 341.667 114.5 290.8 114.5 378C114.5 465.2 38.8333 419.333 1 385.5V633H1381.5V579V449L1299 481.5L1287.5 418L1151.5 360.5L1182 309L1128.5 245.5H1220.5L1257 197.5L1318.5 257L1274 127H1349L1381.5 50L1433.5 127L1496.5 138.5L1464 257L1519.5 197.5L1573.5 245.5H1650L1598 309L1636.5 360.5L1481.5 418V460.5L1412 449V579V834" stroke="#D80621" />
        </svg> */}


          <div className={HeroContainer + " " + "bg-"}>
            <div className={LeftContainer} >
              <div className={LevelContainer}>
                {props.courseContentData.level}
              </div>
              <h1 className={Title}>{props.courseContentData.title} </h1>
              <div className={CourseRate}>
                <OneStar rating={props.courseContentData.rating.avg}></OneStar>
              </div>
              <p className={Summary}>{props.courseContentData.summary}</p>
              <p>Created by: {props.courseContentData.instructorName}</p>
              <div>
                {/* <button className={CTA}>ENROLL NOW</button> */}
                <div className="mt-4">

                  <MainButton btnText="Enroll Now" HandleClick={() => { }} Size='lg'></MainButton>
                </div>
              </div>
            </div>
            <div className={RightContainer}>
              {VideoPictureApear &&
                <ReactPlayer
                  url={"https://www.youtube.com/embed/SKF7Ue1BeW8"}
                  width="80%"
                  light={true}
                  style={{ borderRadius: "50px", overflow: "hidden", zIndex: 40, boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)" }}
                  onClickPreview={(e) => onclick(e)}
                  height={"17rem"}

                />}
              {VideoPictureApear && <div className={"w-[60rem]  h-[55rem] top-[-18rem]  animate-LeftRightAnim z-10  absolute left-50" + " " + (VideoPictureApear && " ")}>
                <Image quality={100} fill className="object-contain " src={"/images/Maple2.png"} alt="Image"></Image>
              </div>}
              {VideoOpen && <VideoPlayer VideoOpen={VideoOpen} SetVideoPictureApear={SetVideoPictureApear}
                SetVideoOpen={SetVideoOpen} />}


            </div>



          </div>

        </div>
        <div className="min-h-[20vh]  flex justify-around font-bold text-white text-xl items-center bg-Adv shadow-sm rounded-br-full ">
          <div className="text-center">
            <p>TotalHours</p>
            {/* <p>{props.courseContentData.courseHours}</p> */}
          </div>
          <div>Language</div>
        </div>
      </div>

    );
  }
  else {
    return <div></div>
  }


};

export default CourseContentHero;

const Container = classNames("h=[100vh]  relative   bg-Dark text-white overflow-hidden ")
const LeftContainer = classNames("w-1/2  pr-10  pl-5");
const RightContainer = classNames("w-1/2    z-50   flex justify-center items-center   rounded-full relative");
const HeroContainer = classNames("w-100 h-[80vh]  flex gap-5  bg  px-20 justify-between items-center");
const LevelContainer = classNames("bg-white/60 inline-block text-center px-3 py-1 font-bold uppercase rounded-md mb-6");
const Title = classNames("text-6xl ml-[-10px] mb-2")
const Summary = classNames("text-lg mb-2")
const CourseRate = classNames("mb-4")
const CTA = classNames("border-4 p-2 mt-4 rounded-xl")