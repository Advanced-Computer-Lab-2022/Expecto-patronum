import axios from 'axios'
import classNames from 'classnames'
import React, { useContext, useEffect, useState } from 'react'
import Spinner from '../../components/shared/spinner/Spinner'
import CourseSideBar from '../../components/UserCourse/CourseSideBar/CourseSideBar'
import WatchContent from '../../components/UserCourse/WatchContent/WatchContent'
import UserCourseCard from '../../components/UserHome/UserCourseCard'
import DataContext from '../../context/DataContext'
import { AllCourseDataInterface } from '../../Interface/PurchasedCourse/AllCourseDataInterface'

type Props = {}

const UserCourse = (props: Props) => {
  const [Course, setCourse] = useState<AllCourseDataInterface>();
  const { ContentChoosen, SetContentChoosen } = useContext(DataContext);
  const [Next, SetNext] = useState(false);
  const [Prev, SetPrev] = useState(false);
  const [CloseSideBar, SetCloseSideBar] = useState(false);
  const { SetCourseChoosen } = useContext(DataContext);
  const [Loading, SetLoading] = useState(true);
  const [Error, SetError] = useState({ Message: "", hasError: false });
  useEffect(() => {
    async function fetchData() {
      try {
        SetLoading(true);
        const res = await axios.put("http://localhost:5000/user/selectCourse", {
          userId: "63a59b15f928fa951091f381",
          courseId: "63a59c15e3b96b22a1dc828a"
        })
        let Coursedata: AllCourseDataInterface = res.data.course
        let instructorData = res.data.instructor
        setCourse(Coursedata);
        SetCourseChoosen(Coursedata);
        SetContentChoosen({
          SubtitleID: Coursedata.subtitles[0]._id,
          ContentID: Coursedata.subtitles[0].contents[0]._id,
          data: { url: Coursedata.subtitles[0].contents[0].video, time: Coursedata.subtitles[0].contents[0].duration },
          isExercise: false
        })
      } catch (error) {
        //@ts-ignore
        SetError({ Message: error.message + "", hasError: true });
      }
      SetLoading(false);

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

    if (Course?.subtitles) {

      let SubtitleIndex = Course.subtitles.findIndex((subtitle) => subtitle._id === ContentChoosen.SubtitleID);
      let ContentIndex = Course.subtitles[SubtitleIndex].contents.findIndex((content) => content._id === ContentChoosen.ContentID);
      if (ContentIndex === Course.subtitles[SubtitleIndex].contents.length - 1) {
        if (Course.subtitles[SubtitleIndex]?.exercise?.length === 1) {
          SetContentChoosen(prev => {
            return {
              ...prev,
              SubtitleID: Course.subtitles[SubtitleIndex]._id,  //@ts-ignore
              ContentID: Course.subtitles[SubtitleIndex].exercise[0].exerciseID || "", //@ts-ignore
              data: { name: Course.subtitles[SubtitleIndex].exercise[0].exerciseName || "" },
              isExercise: true
            }
          })
        }
        else {
          if (SubtitleIndex === Course.subtitles.length - 1) {
            return;
          }
          else {
            SetContentChoosen(prev => {
              return {
                ...prev,
                SubtitleID: Course.subtitles[SubtitleIndex + 1]._id,
                ContentID: Course.subtitles[SubtitleIndex + 1].contents[0]._id,
                data: { url: Course.subtitles[SubtitleIndex + 1].contents[0].video, time: 0 },
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
            ContentID: Course.subtitles[SubtitleIndex].contents[ContentIndex + 1]._id,
            data: { url: Course.subtitles[SubtitleIndex].contents[ContentIndex + 1].video, time: 0 },
            isExercise: false
          }
        })
      }
      if (ContentIndex === Course.subtitles[SubtitleIndex].contents.length - 2) {
        SetNext(false);
      }
      SetPrev(true);
    }


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
    if (Course?.subtitles) {

      let SubtitleIndex = Course.subtitles.findIndex((subtitle) => subtitle._id === ContentChoosen.SubtitleID);
      let ContentIndex = 0;
      if (ContentChoosen.isExercise) {
        ContentIndex = Course.subtitles[SubtitleIndex].contents.length;
      }
      else {
        ContentIndex = Course.subtitles[SubtitleIndex].contents.findIndex((content) => content._id === ContentChoosen.ContentID);

      }
      if (ContentIndex === 0) {
        if (SubtitleIndex === 0) {
          return;
        }
        else {
          if (Course.subtitles[SubtitleIndex - 1].exercise?.length === 1) {
            SetContentChoosen(prev => {
              return {
                ...prev,
                SubtitleID: Course.subtitles[SubtitleIndex - 1]._id,             //@ts-ignore
                ContentID: Course.subtitles[SubtitleIndex - 1].exercise[0].exerciseID || "", //@ts-ignore
                data: { name: Course.subtitles[SubtitleIndex - 1].exercise[0].exerciseName || "" },
                isExercise: true
              }
            })
          }
          else {
            SetContentChoosen(prev => {
              return {
                ...prev,
                SubtitleID: Course.subtitles[SubtitleIndex - 1]._id,
                ContentID: Course.subtitles[SubtitleIndex - 1].contents[Course.subtitles[SubtitleIndex - 1].contents.length - 1]._id,
                data: { url: Course.subtitles[SubtitleIndex - 1].contents[Course.subtitles[SubtitleIndex - 1].contents.length - 1].video, time: 0 },
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
            ContentID: Course.subtitles[SubtitleIndex].contents[ContentIndex - 1]._id,
            data: { url: Course.subtitles[SubtitleIndex].contents[ContentIndex - 1].video, time: 0 },
            isExercise: false
          }
        })
      }
      if (ContentIndex === 0 && SubtitleIndex === 0) {
        SetPrev(false);
      }
      SetNext(true);
    }

  }

  if (Loading) {
    return (
      <Spinner></Spinner>
    )
  }
  if (Error.hasError) {
    return (
      <div className="overflow-x-hidden">
        <div className='flex w-[100vw] h-[100vh] justify-center items-center  bg-navbar'>
          <p className=' text-4xl font-bold text-white'>{Error.Message}</p>
        </div>
      </div>
    )
  }

  if (Course) {
    return (
      <div className={UserCourseContainer + " " + (CloseSideBar && "overflow-x-hidden")}>
        <WatchContent Next={Next} Prev={Prev} HandleNext={HandleNext} HandlePrev={HandlePrev}></WatchContent>
        <CourseSideBar data={Course.subtitles} SetCloseSideBar={SetCloseSideBar} CloseSideBar={CloseSideBar}></CourseSideBar>
        {CloseSideBar && <div onClick={() => { SetCloseSideBar(false) }} className='absolute bg-red-800 w-11  top-20  right-0'>Arrow</div>}
      </div>
    )
  }
}

export default UserCourse

const UserCourseContainer = classNames("flex justify-between items-start relative ");