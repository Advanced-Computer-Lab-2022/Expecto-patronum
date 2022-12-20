import classNames from 'classnames'
import React, { useEffect } from 'react'
import ReactPlayer from 'react-player/lazy'
import DataContext from '../../../context/DataContext'
import Exercise from './ViewExercise'
import Tabs from './Tabs'

type Props = {
  Next: boolean;
  Prev: boolean;
  HandleNext: () => void;
  HandlePrev: () => void;
}

const WatchContent = (props: Props) => {
  let videoRef = React.useRef(null);
  const [pause, setPause] = React.useState(false);
  const { ContentChoosen, SetContentChoosen } = React.useContext(DataContext);
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

  return (
    <div className='w-full'>
      {ContentChoosen.isExercise ?
        <Exercise></Exercise> :
        <div className={VideoContainer}>
          <ReactPlayer
            //@ts-ignore
            url={ContentChoosen.data.url || ""}
            controls={true}
            playing={!pause}
            width={'100%'}
            height={'100%'}
            onPlay={() => setPause(false)}
            ref={videoRef}
            onEnded={() => { console.log("Finished") }} />
        </div>
      }

      <Tabs Next={props.Next} Prev={props.Prev} HandleNext={props.HandleNext} HandlePrev={props.HandlePrev} setPause={setPause} videoRef={videoRef}></Tabs>

    </div>
  )
}

export default WatchContent

const VideoContainer = classNames("bg-gray-900 h-[70vh]");
const TabsContainer = classNames("bg-red");