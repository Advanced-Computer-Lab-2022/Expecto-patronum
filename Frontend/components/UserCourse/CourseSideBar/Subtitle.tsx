import { useAutoAnimate } from '@formkit/auto-animate/react'
import classNames from 'classnames'
import React, { useEffect } from 'react'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

import { AiFillPlayCircle } from 'react-icons/ai'
import CourseSubtitleData from '../../CourseContent/CourseSubtitleData'
import DataContext from '../../../context/DataContext'
import { subtitlesData } from '../../../DataFestek'
import { FaPencilAlt } from 'react-icons/fa'
import { SideBarInterface } from '../../../Interface/PurchasedCourse/SideBarInterface'
import Content from '../../Instructor/Subtitle/Content/Content'

type Props = {
  subtitle: SideBarInterface
  index: number
}

const Subtitle = (props: Props) => {


  let x = [1, 2, 3, 4, 5];
  // console.log(props.subtitle);
  // const [animationParent] = useAutoAnimate<HTMLDivElement>();
  const { ContentChoosen, SetContentChoosen, WatchedVideos, SolvedExercises } = React.useContext(DataContext);

  const [ShowSubtitle, SetShowSubtitle] = React.useState(props.subtitle._id === ContentChoosen?.SubtitleID);


  // let Hours = Math.floor(props.subtitle.totalMinutes / 60);
  //I have subtitle index (props.index)
  // I have content index when i map 
  // I have the subtitle length (props.subtitle.content.length)

  //Subttile is a drop down menu
  // it will open when clicked
  // it will be opened if it is equal to the choosenContetn subtitle index

  // and it can disaeapr when we click X button
  // and if it is diseapred we will show an arrow to open it again

  useEffect(() => {
    SetShowSubtitle(props.subtitle._id === ContentChoosen?.SubtitleID);

  }, [ContentChoosen])



  function handleOnClick(index: number, Exercise = false) {
    SetContentChoosen({
      SubtitleID: props.subtitle._id,
      subttitleName: props.subtitle.header,
      subtitleIndex: props.index,
      contentIndex: index,
      contentName: Exercise ? (props.subtitle.exercise[0]!.exerciseName || "") : props.subtitle.contents[index].description,
      //@ts-ignore
      ContentID: Exercise ? (props.subtitle.exercise[0].exerciseID || "") : props.subtitle.contents[index]._id,
      isExercise: Exercise,
      //@ts-ignore
      data: Exercise ? { name: (props.subtitle.exercise[0].exerciseName || "") } : { url: props.subtitle.contents[index].video, time: 0 }
    })
  }



  return (
    <div className={SubtitleContainer}>
      <div className={SubtitleDataContainer} onClick={() => { SetShowSubtitle((prev) => !prev); }} >
        <div className={SubtitleHeaderContainer}>
          <h1 className={SubtitleHeader}>Section {props.index}:{props.subtitle.header} </h1>
          <IoIosArrowDown fontSize={20} className={Arrow + (ShowSubtitle && ArrowPressed)} />
          {/* <h1 className="text-2xl font-bold">{props.subtitle.header}</h1> */}
        </div>
        <p className={SubtitleSubHeader}>{Math.floor(props.subtitle.totalMinutes / 60)} min</p>

        {/* <p className="text-sm">{Hours} h</p> */}

      </div>
      {ShowSubtitle && (
        <div>
          {props.subtitle.contents.map((content, index) => {
            return (
              <div onClick={() => handleOnClick(index)}
                className={ContentContainer + " " +
                  (
                    ((props.subtitle._id === ContentChoosen.SubtitleID) && (content._id === ContentChoosen.ContentID))
                    && SelectedContent
                  )
                }>


                <input checked={WatchedVideos.length > 0 && WatchedVideos.includes(content.video) ? true : false} type="checkbox" className={CheckBox} />
                <div className={ContentDataContainer} >
                  <h1 className={ContentHeader}>{index + 1}.{content.description}</h1>
                  <div className={ContetnSubheaderContainer}>
                    <AiFillPlayCircle color='gray' />
                    <p className={ContentSubHeader}>{Math.floor(content.duration / 60)}min</p>
                  </div>
                </div>
              </div>

            )
          })}
          {(props.subtitle.exercise?.length === 1) && <div onClick={() => handleOnClick(props.subtitle.contents.length, true)}
            className={ContentContainer + " " +
              (
                (
                  (props.subtitle._id === ContentChoosen?.SubtitleID) && (props.subtitle.exercise[0]!.exerciseID === ContentChoosen.ContentID))
                && SelectedContent)}>
            <input type="checkbox" checked={SolvedExercises.findIndex((Ex) => { Ex.excerciseID == props.subtitle.exercise[0]?.exerciseID }) !== -1} className={CheckBox} />
            <div className={ContentDataContainer} >
              <h1 className={ContentHeader}>{props.subtitle.contents.length + 1}.{props.subtitle.exercise[0]!.exerciseName}</h1>
              <div className={ContetnSubheaderContainer}>
                <FaPencilAlt color='gray' />
                <p className={ContentSubHeader}>Exercise</p>

              </div>
            </div>
          </div>}

        </div>
      )
      }
    </div >

  )
}

export default Subtitle

const SubtitleContainer = classNames("border-b-2 cursor-pointer pt-2");
const SubtitleDataContainer = classNames("pr-4 pl-6 pb-2 pt-2");
const SubtitleHeaderContainer = classNames("flex gap-2  ");
const SubtitleHeader = classNames("text-lg font-bold ");
const SubtitleSubHeader = classNames("text-sm text-gray-600");
const ArrowPressed = classNames("rotate-180");
const Arrow = classNames("mt-1  transition-all ease-linear ");

const ContentContainer = classNames("flex items-start gap-6  hover:bg-gray-300  pt-2 pb-2 pr-4 pl-6 bg-gray-100");
const CheckBox = classNames("w-4 h-4 mt-1");
const ContentDataContainer = classNames("flex flex-col ");
const ContentHeader = classNames("text-md");
const ContetnSubheaderContainer = classNames("flex items-center just-start gap-1");
const ContentSubHeader = classNames("text-xs text-gray-600 mt-1");
const SelectedContent = classNames("bg-gray-400 hover:bg-gray-400");


