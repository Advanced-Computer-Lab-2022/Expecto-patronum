import { WindowSharp } from "@mui/icons-material";
import classNames from "classnames";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player/youtube";
import { CourseHeroData } from "../../Interface/NotPurchasedCourse/CourseHeroData";
import OneStar from "../shared/rating/OneStar";
import VideoPlayer from "../shared/Video/VideoPlayer";

type Props = {
  SetNavApear: Function;
  courseContentData: CourseHeroData;




};


const CourseContentHero = (props: Props) => {
  console.log(props.courseContentData);
  const listInnerRef = useRef(null);
  const [VideoPictureApear, SetVideoPictureApear] = React.useState(false);
  const [VideoOpen, SetVideoOpen] = React.useState(false);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { offsetHeight, scrollHeight } = listInnerRef.current;
      if (window.scrollY >= offsetHeight) {
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
      <div ref={listInnerRef} className={Container}>
        <div className={HeroContainer}>
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
              <button className={CTA}>ENROLL NOW</button>
            </div>
          </div>
          <div className={RightContainer}>
            {VideoPictureApear && <ReactPlayer
              url={"https://www.youtube.com/embed/SKF7Ue1BeW8"}
              width="80%"
              light={true}
              style={{ borderRadius: "10px", overflow: "hidden" }}
              onClickPreview={(e) => onclick(e)}
              height={"17rem"}

            />}
            {VideoOpen && <VideoPlayer VideoOpen={VideoOpen} SetVideoPictureApear={SetVideoPictureApear}
              SetVideoOpen={SetVideoOpen} />}


          </div>
        </div>
        <div className="min-h-[15vh]  flex justify-around items-center shadow-sm">
          <div className="text-center">
            <p>TotalHours</p>
            <p>{props.courseContentData.courseHours}</p>
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

const Container = classNames("h=[100vh] px-10 relative")
const LeftContainer = classNames("w-1/2  pr-10 ");
const RightContainer = classNames("w-1/2 flex justify-end ");
const HeroContainer = classNames("w-100 h-[80vh]  flex gap-5  bg  px-20 justify-between items-center");
const LevelContainer = classNames("bg-white/60 inline-block text-center px-3 py-1 font-bold uppercase rounded-md mb-6");
const Title = classNames("text-6xl ml-[-10px] mb-2")
const Summary = classNames("text-lg mb-2")
const CourseRate = classNames("mb-4")
const CTA = classNames("border-4 p-2 mt-4 rounded-xl")