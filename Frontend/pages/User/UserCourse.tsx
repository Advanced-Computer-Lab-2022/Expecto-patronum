import axios from 'axios'
import classNames from 'classnames'
import React, { useEffect } from 'react'
import CourseSideBar from '../../components/UserCourse/CourseSideBar/CourseSideBar'
import WatchContent from '../../components/UserCourse/WatchContent/WatchContent'
import UserCourseCard from '../../components/UserHome/UserCourseCard'
import DataContext from '../../context/DataContext'
import { subtitlesData } from '../../DataFestek'

type Props = {}

const UserCourse = (props: Props) => {
  const [course, setCourse] = React.useState(null);
  const { ContentChoosen, SetContentChoosen } = React.useContext(DataContext);
  const [Next, SetNext] = React.useState(false);
  const [Prev, SetPrev] = React.useState(false);
  const [CloseSideBar, SetCloseSideBar] = React.useState(false);
  console.log(ContentChoosen)
  useEffect(() => {
    async function fetchData() {
      const res = await axios("http://localhost:3000/api/course/1");
      setCourse(res.data);
    }
    fetchData();

  }, [])

  function HandleNext() {
    //first loop on the subtitles with to get the index of the subttitle id
    // second loop on the contents of the subtitle to get the index of the content id
    // if the content index is the last one of the subtitle we will check if the subttitle has exercise or not
    // if the subtitle has exercise we will go to the exercise
    // if the subtitle has no exercise we will go to the next subtitle
    // if the subtitle index is the last one of the course then we will do nothing
    // if the content index is not the last one of the subtitle then we will go to the next content
    // if the subtitle index is not the last one of the course then we will go to the next subtitle
    //we set the data of each content in the content choosen according if it is exercise or not


    let SubtitleIndex = subtitlesData.findIndex((subtitle) => subtitle._id === ContentChoosen.SubtitleID);
    let ContentIndex = subtitlesData[SubtitleIndex].contents.findIndex((content) => content._id === ContentChoosen.ContentID);
    if (ContentIndex === subtitlesData[SubtitleIndex].contents.length - 1) {
      if (subtitlesData[SubtitleIndex].exercise) {
        SetContentChoosen(prev => {
          return {
            ...prev,
            SubtitleID: subtitlesData[SubtitleIndex]._id,
            ContentID: subtitlesData[SubtitleIndex].exercise?.exerciseID || "",
            data: { name: subtitlesData[SubtitleIndex].exercise?.exerciseName || "" },
            isExercise: true
          }
        })
      }
      else {
        if (SubtitleIndex === subtitlesData.length - 1) {
          return;
        }
        else {
          SetContentChoosen(prev => {
            return {
              ...prev,
              SubtitleID: subtitlesData[SubtitleIndex + 1]._id,
              ContentID: subtitlesData[SubtitleIndex + 1].contents[0]._id,
              data: { url: subtitlesData[SubtitleIndex + 1].contents[0].video, time: 0 },
              isExercise: false
            }
          })
        }
      }
    }
    else {
      SetContentChoosen(prev => {
        return {
          ...prev,
          SubtitleID: ContentChoosen.SubtitleID,
          ContentID: subtitlesData[SubtitleIndex].contents[ContentIndex + 1]._id,
          data: { url: subtitlesData[SubtitleIndex].contents[ContentIndex + 1].video, time: 0 },
          isExercise: false
        }
      })
    }
    if (ContentIndex === subtitlesData[SubtitleIndex].contents.length - 2) {
      SetNext(false);
    }
    SetPrev(true);

  }




  function HandlePrev() {
    //first loop on the subtitles with to get the index of the subttitle id
    // second loop on the contents of the subtitle to get the index of the content id
    // if the content index is the first one of the subtitle then we will go to the prev subtitle but first we will check if the prev subtitle has exercise or not
    //if the prev subtitle has exercise we will go to the exercise
    // if the prev subtitle has no exercise we will go to the last content of the prev subtitle
    // if the subtitle index is the first one of the course then we will do nothing
    // if the content index is not the first one of the subtitle then we will go to the prev content
    // if the subtitle index is not the first one of the course then we will go to the prev subtitle
    //we set the data of each content in the content choosen according if it is exercise or not
    //we set the next and prev button according to the content index


    let SubtitleIndex = subtitlesData.findIndex((subtitle) => subtitle._id === ContentChoosen.SubtitleID);
    let ContentIndex = 0;
    if (ContentChoosen.isExercise) {
      ContentIndex = subtitlesData[SubtitleIndex].contents.length;
    }
    else {
      ContentIndex = subtitlesData[SubtitleIndex].contents.findIndex((content) => content._id === ContentChoosen.ContentID);

    }
    if (ContentIndex === 0) {
      if (SubtitleIndex === 0) {
        return;
      }
      else {
        if (subtitlesData[SubtitleIndex - 1].exercise) {
          SetContentChoosen(prev => {
            return {
              ...prev,
              SubtitleID: subtitlesData[SubtitleIndex - 1]._id,
              ContentID: subtitlesData[SubtitleIndex - 1].exercise?.exerciseID || "",
              data: { name: subtitlesData[SubtitleIndex - 1].exercise?.exerciseName || "" },
              isExercise: true
            }
          })
        }
        else {
          SetContentChoosen(prev => {
            return {
              ...prev,
              SubtitleID: subtitlesData[SubtitleIndex - 1]._id,
              ContentID: subtitlesData[SubtitleIndex - 1].contents[subtitlesData[SubtitleIndex - 1].contents.length - 1]._id,
              data: { url: subtitlesData[SubtitleIndex - 1].contents[subtitlesData[SubtitleIndex - 1].contents.length - 1].video, time: 0 },
              isExercise: false
            }
          })
        }
      }
    }
    else {

      SetContentChoosen(prev => {
        return {
          ...prev,
          SubtitleID: ContentChoosen.SubtitleID,
          ContentID: subtitlesData[SubtitleIndex].contents[ContentIndex - 1]._id,
          data: { url: subtitlesData[SubtitleIndex].contents[ContentIndex - 1].video, time: 0 },
          isExercise: false
        }
      })
    }
    if (ContentIndex === 0 && SubtitleIndex === 0) {
      SetPrev(false);
    }
    SetNext(true);
  }


  return (
    <div className={UserCourseContainer + " " + (CloseSideBar && "overflow-x-hidden")}>
      <WatchContent Next={Next} Prev={Prev} HandleNext={HandleNext} HandlePrev={HandlePrev}></WatchContent>
      <CourseSideBar SetCloseSideBar={SetCloseSideBar} CloseSideBar={CloseSideBar}></CourseSideBar>
      {CloseSideBar && <div onClick={() => { SetCloseSideBar(false) }} className='absolute bg-red-800 w-11  top-20  right-0'>Arrow</div>}
    </div>
  )
}

export default UserCourse

const UserCourseContainer = classNames("flex justify-between items-start relative ");