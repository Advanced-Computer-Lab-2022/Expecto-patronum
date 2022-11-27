import { WindowSharp } from "@mui/icons-material";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { CourseHeroData } from "../../Interface/CourseHeroData";
import VideoPlayer from "../shared/Video/VideoPlayer";

type Props = {
  SetNavApear: Function;
  courseContentData: CourseHeroData; 
 

  
  
  

};

const CourseContentHero = (props: Props) => {
  const listInnerRef = useRef(null);

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

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  if(props.courseContentData){
    return (
      <div ref={listInnerRef} className="h-[100vh]  ">
        <div className="w-100 h-[80vh]  flex   bg  px-20 justify-between items-center">
          <div className="flex-1">
            <div>
              <div className="bg-white/60 inline-block text-center px-3 py-1 font-bold uppercase rounded-md mb-6">
                {props.courseContentData.Level}
              </div>
  
              <h1 className="text-6xl">{props.courseContentData.Title} </h1>
              <p className="text-lg">{props.courseContentData.Summary}</p>
              <div className="">{props.courseContentData.Rate}</div>
              <p>Created by: {props.courseContentData.InstructorName}</p>
            </div>
            <div>
              <button className="border-4 p-2">Start Course</button>
            </div>
          </div>
          <div>Preview Video</div>
        </div>
        <div className="min-h-[15vh]  flex justify-around items-center shadow-sm">
          <div className="text-center">
          <p>TotalHours</p>
            <p>{props.courseContentData.TotalHours}</p>
          </div>
          <div>Language</div>
        </div>
      </div>
    );
  }
  else{
    return <div></div>
  }

  
};

export default CourseContentHero;
