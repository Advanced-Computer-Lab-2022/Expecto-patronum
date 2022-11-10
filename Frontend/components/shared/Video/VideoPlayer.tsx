import React from "react";
import ReactPlayer from "react-player/lazy";
import { AiOutlineClose } from "react-icons/ai";

interface Video {
  videoData: string;
  isOpen: boolean;
  setOpen: any;
}

const VideoPlayer: React.FC<Video> = ({ videoData, isOpen, setOpen }) => {
  return (
    <div className="absolute top-0 right-0 left-0 bottom-0 w-full h-full flex justify-center items-center bg-black/40">
      <div className=" p-6 bg-black">
        <div className="flex justify-between">
          <h1 className="pb-10 text-3xl text-white">Introduction</h1>
          <AiOutlineClose
            onClick={() => setOpen(false)}
            className="cursor-pointer "
            color="white"
            width={100}
            height={100}
          ></AiOutlineClose>
        </div>
        <ReactPlayer
          url={"https://www.youtube.com/watch?v=ixZRNz76W90"}
          controls={true}
          config={{
            youtube: {
              playerVars: { showinfo: 1 },
            },
          }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
