import classNames from 'classnames'
import React, { useEffect } from 'react'
import DataContext from '../../../context/DataContext'
import Subtitle from './Subtitle'
import { AiOutlineClose } from 'react-icons/ai';
import { subtitlesData } from "../../../DataFestek"


type Props = {
  data?: any
  SetCloseSideBar: Function,
  CloseSideBar: boolean
}




const CourseSideBar = (props: Props) => {
  const { ContentChoosen, SetContentChoosen } = React.useContext(DataContext);

  // useEffect(() => {
  //   if (ContentChoosen.SubtitleID == "" || ContentChoosen.ContentID == "") {
  //     SetContentChoosen((prev) => {
  //       return {
  //         ...prev,
  //         SubtitleID: subtitlesData[prev.SubtitleIndex]._id,
  //         ContentID:
  //           subtitlesData[prev.SubtitleIndex].contents.length > prev.ContentIndex ?
  //             subtitlesData[prev.SubtitleIndex].contents[prev.ContentIndex]._id :
  //             subtitlesData[prev.SubtitleIndex].exercise ?
  //               // @ts-ignore
  //               subtitlesData[prev.SubtitleIndex].exercise.exerciseID :
  //               subtitlesData[prev.SubtitleIndex].contents[0]._id,
  //         SubtitleLength: subtitlesData[prev.SubtitleIndex].contents.length + (subtitlesData[prev.SubtitleIndex].exercise ? 1 : 0),
  //         isExercise: subtitlesData[prev.SubtitleIndex].exercise ? true : false,
  //         data: subtitlesData[prev.SubtitleIndex].exercise ?
  //           { id: (subtitlesData[prev.SubtitleIndex].exercise?.exerciseID || ""), name: (subtitlesData[prev.SubtitleIndex].exercise?.exerciseName || "") } :
  //           { ...prev.data, url: subtitlesData[prev.SubtitleIndex].contents[prev.ContentIndex].video }
  //       }
  //     })
  //   }
  // else {
  //   if (ContentChoosen.ContentIndex == -1 && ContentChoosen.SubtitleIndex == -1) {
  //     let subtitleIndex = subtitlesData.findIndex((x) => x._id == ContentChoosen.SubtitleID);
  //     let contentIndex = subtitlesData[subtitleIndex].contents.findIndex((x) => x._id == ContentChoosen.ContentID);
  //     SetContentChoosen((prev) => {
  //       return {
  //         ...prev,
  //         SubtitleIndex: subtitleIndex,
  //         ContentIndex: contentIndex == -1 ? subtitlesData[subtitleIndex].contents.length : contentIndex,
  //         SubtitleLength: subtitlesData[subtitleIndex].contents.length + (subtitlesData[subtitleIndex].exercise ? 1 : 0),
  //         isExercise: subtitlesData[subtitleIndex].exercise ? true : false,
  //         data: subtitlesData[subtitleIndex].exercise ?
  //           { id: (subtitlesData[subtitleIndex].exercise?.exerciseID || ""), name: (subtitlesData[subtitleIndex].exercise?.exerciseName || "") }
  //           : { ...prev.data, url: subtitlesData[subtitleIndex].contents[contentIndex].video }
  //       }
  //     })

  //   }
  // }


  // }, [ContentChoosen])

  useEffect(() => {
    //when we press on a note that is written we get it from the database with the content id and the subtitle id 
    //so we set both of these but we dont have the data so here we check if we have a ContentChoosen with no data we set its data
    //@ts-ignore
    if (ContentChoosen.isExercise && ContentChoosen.data.name == "" || !ContentChoosen.isExercise && ContentChoosen.data.url == "") {
      let subtitleIndex = subtitlesData.findIndex((x) => x._id == ContentChoosen.SubtitleID);
      let contentIndex = subtitlesData[subtitleIndex].contents.findIndex((x) => x._id == ContentChoosen.ContentID);
      SetContentChoosen((prev) => {
        return {
          ...prev,
          isExercise: subtitlesData[subtitleIndex].exercise ? true : false,
          data: subtitlesData[subtitleIndex].exercise ?
            { name: (subtitlesData[subtitleIndex].exercise?.exerciseName || "") }
            // @ts-ignore
            : { ...prev.data, url: subtitlesData[subtitleIndex].contents[contentIndex].video }
        }
      })

    }


  }, [ContentChoosen])


  let RefsArray: React.RefObject<HTMLDivElement>[] = [];
  let MainRef = React.useRef<HTMLDivElement>(null);
  // const [scrollY, setScrollY] = React.useState(0);
  const [FixSideBar, SetFixSideBar] = React.useState(false);

  for (let i = 0; i < subtitlesData.length; i++) {
    let ref: React.RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(null);
    RefsArray.push(ref);
  }


  function ScrollTo(myRef: React.RefObject<HTMLDivElement>) {
    console.log(MainRef.current?.scrollTop)
    console.log(MainRef.current?.scrollHeight)
    console.log(myRef.current?.offsetTop)

    if (myRef.current) {
      MainRef.current?.scrollTo(
        {
          top: myRef.current?.offsetTop - 100,
          behavior: "smooth"

        }


      );

    }

  }


  function logit() {
    if (scrollY >= 84) {
      SetFixSideBar(true);
    }
    else {
      SetFixSideBar(false);
    }
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", logit);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", logit);
    };
  });

  return (

    <div className={SideBarContainer + " " + (!props.CloseSideBar && FixSideBar && FixedSideBar) + " " + (props.CloseSideBar && HiddenSideBar)}>
      <div className={SideBarHeaderContainer}>
        <h1 className={SideBarHeader}>Course Content</h1>
        <AiOutlineClose onClick={() => { props.SetCloseSideBar(true) }} cursor={'pointer'} fontSize={20} />
      </div>
      <div ref={MainRef} className={SideBarSubtitles}>
        {subtitlesData.map((subtitle, index) => {
          return (
            <div ref={RefsArray.length > 0 ? RefsArray[index] : null} onClick={(ref) => ScrollTo(RefsArray[index])}>
              <Subtitle subtitle={subtitle} index={index}></Subtitle>
            </div>


          )

        })}

      </div>


    </div>

  )
}

export default CourseSideBar
const SideBarContainer = classNames("w-[30%] opacity-1 transition-all shadow-md bg-main ");
const SideBarHeaderContainer = classNames("flex w-full justify-between shadow-sm items-center border-b-2 pl-6 pr-6 py-2 bg-gray-100  ");
const SideBarHeader = classNames("text-lg font-bold ");
const SideBarSubtitles = classNames("h-[100vh] overflow-auto ")
const FixedSideBar = classNames("sticky top-0 right-0 z-100 ")
const HiddenSideBar = classNames('opacity-0 w-[0] transition-all duration-300')
