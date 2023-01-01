import classNames from 'classnames'
import React, { useContext, useEffect } from 'react'
import ReactPlayer from 'react-player/lazy'
import DataContext from '../../../context/DataContext'
import Exercise from './ViewExercise'
import Tabs from './Tabs'
import { AllCourseDataInterface } from '../../../Interface/PurchasedCourse/AllCourseDataInterface'
import axios from 'axios'

type Props = {
  Next: boolean;
  Prev: boolean;
  HandleNext: () => void;
  HandlePrev: () => void;


}

const WatchContent = (props: Props) => {
  let videoRef = React.useRef(null);
  const [pause, setPause] = React.useState(false);
  const { ContentChoosen, SetContentChoosen, SetProgress, SetWatchedVideos, WatchedVideos } = React.useContext(DataContext);


  //Video  
  //Tabs   //OverView, Notes, Q/A
  useEffect(() => {
    if (!ContentChoosen.isExercise) {
      if (videoRef.current) {
        //@ts-ignore
        videoRef.current.seekTo(ContentChoosen.data.time);
      }

    }

  }, [ContentChoosen])

  async function HandleEnd() {
    // console.log(videoRef.current?.getDuration())
    let res = await axios.put("http://localhost:5000/user/watchVideo", {
      userID: "63a59b15f928fa951091f381",
      courseID: "63a59c15e3b96b22a1dc828a",
      //@ts-ignore
      videoURL: ContentChoosen.data.url,
      //@ts-ignore
      //in minutes
      videotime: videoRef.current?.getDuration() / 60 || 1,
    })
    SetProgress(res.data.progress)
    SetWatchedVideos(res.data.watchedVideos)


  }


  return (
    <div className='w-full'>
      {ContentChoosen.isExercise ?
        <Exercise></Exercise> :
        <div className={VideoContainer}>
          <ReactPlayer
            //@ts-ignore
            url={ContentChoosen.data.url || ""}//The url of the video
            controls={true}//Show the controls of the video which are the native youtube video controls
            playing={!pause}//set the state of the video to play or pause by default it is set to play
            width={'100%'} //The width of the video
            height={'100%'} //The height of the video
            onPlay={() => setPause(false)} //a function that is called when the video is played
            ref={videoRef} // a ref to the video which from it we can get more details about the video like duration
            onEnded={HandleEnd}   //a function that is called when the video is ended
          />
        </div>
      }

      <Tabs Next={props.Next} Prev={props.Prev} HandleNext={props.HandleNext} HandlePrev={props.HandlePrev} setPause={setPause} videoRef={videoRef}></Tabs>

    </div>
  )
}

export default WatchContent

const VideoContainer = classNames("bg-gray-900 h-[70vh]");
const TabsContainer = classNames("bg-red");