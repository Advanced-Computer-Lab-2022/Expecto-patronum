import React, { HtmlHTMLAttributes, useEffect } from "react";
import ReactPlayer from "react-player/youtube";

import { AiOutlineClose } from "react-icons/ai";
import classNames from "classnames";

interface Video {
  videoData?: string;
  VideoOpen: boolean;
  SetVideoPictureApear: Function;
  SetVideoOpen: Function;
}
const VideoPlayer: React.FC<Video> = ({ videoData, VideoOpen, SetVideoOpen, SetVideoPictureApear }) => {
  let videoRef = React.useRef<HTMLInputElement>(null);
  const [Position, SetPosition] = React.useState(0);
  useEffect(() => {
    SetPosition(window.scrollY);
  }, [VideoOpen]);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (videoRef.current && !videoRef.current.contains(event.target)) {
        SetVideoOpen(false);
        SetVideoPictureApear(true);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [videoRef]);


  function onClick() {


  }

  return (
    <div style={{ 'top': Position - 80 }} onClick={onClick} className={Container}>
      <div ref={videoRef} className={VideoPlayerContainer}>
        <div className="flex justify-between">
          <h1 className="pb-10 text-3xl text-white">Introduction</h1>
          <AiOutlineClose
            className="cursor-pointer "
            color="white"
            onClick={() => { SetVideoOpen(false); SetVideoPictureApear(true); }}
            width={100}
            height={100}
          ></AiOutlineClose>
        </div>

        <div>
          <ReactPlayer
            url={"https://www.youtube.com/embed/SKF7Ue1BeW8"}
            controls={true}
            playing={true}
          />
        </div>


      </div>
    </div >

  );
};

export default VideoPlayer;
const Container = classNames("absolute z-50  cursor-pointer  right-0 left-0 bottom-0 h-[100vh]  bg-black/40  flex justify-center items-center ")
const VideoPlayerContainer = classNames(" p-6 bg-black");