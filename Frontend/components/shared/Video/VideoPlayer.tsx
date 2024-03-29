import React, { HtmlHTMLAttributes, useEffect } from "react";
import ReactPlayer from "react-player/youtube";

import { AiOutlineClose } from "react-icons/ai";
import classNames from "classnames";
import Modal from "../Modal/Modal";

interface Video {
  videoData?: string;
  VideoOpen: boolean;
  SetVideoPictureApear: Function;
  SetVideoOpen: Function;
}
const VideoPlayer: React.FC<Video> = ({ videoData, VideoOpen, SetVideoOpen, SetVideoPictureApear }) => {

  let ref = React.useRef(null);





  return (
    <Modal SetOpen={SetVideoOpen} CloseBtn={true} CloseBtnColor={"White"} CloseBtnFunc={() => { SetVideoOpen(false); SetVideoPictureApear(true); }} SetVideoPictureApear={SetVideoPictureApear}>
      <div className={VideoPlayerContainer}>
        <div className="flex justify-between">
          <h1 className="pb-10 text-3xl text-white">Introduction</h1>

        </div>

        <div>
          <ReactPlayer
            url={"https://www.youtube.com/embed/SKF7Ue1BeW8"}
            controls={true}
            playing={true}
            onEnded={() => { SetVideoOpen(false); SetVideoPictureApear(true); }}

          />
        </div>


      </div>
    </Modal>



  );
};

export default VideoPlayer;
const VideoPlayerContainer = classNames(" p-6 bg-black  z-50");