import axios from 'axios'
import classNames from 'classnames'
import React, { useContext, useEffect, useState } from 'react'
import Spinner from '../../../components/shared/spinner/Spinner'
import CourseSideBar from '../../../components/UserCourse/CourseSideBar/CourseSideBar'
import WatchContent from '../../../components/UserCourse/WatchContent/WatchContent'
import {
  ImArrowLeft2
} from 'react-icons/im'
import UserCourseCard from '../../../components/UserHome/UserCourseCard'
import DataContext from '../../../context/DataContext'
import { AllCourseDataInterface } from '../../../Interface/PurchasedCourse/AllCourseDataInterface'
import ErrorComp from '../../../components/shared/Error/ErrorComp'
import { GetServerSidePropsContext } from 'next/types'
import { ApiUrl } from '../../../constants/constants'
import router from 'next/router'
import { AES, enc } from 'crypto-js'

type Props = {
  id: string
}

const UserCourse = (props: Props) => {
  const [Course, setCourse] = useState<AllCourseDataInterface>();
  const { ContentChoosen, SetContentChoosen, SetNotes, SetFinalExam, SetCompleted, SetCourseName, SetProgress, WatchedVideos, SetWatchedVideos, SetSolvedExercises, SetCurrentRatings } = useContext(DataContext);
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
        const res = await axios.put("http://localhost:5000/User/selectCourse", {
          courseId: props.id
        })
        console.log(res.data)
        let Coursedata: AllCourseDataInterface = res.data.course
        let Notes = res.data.notes;
        let instructorData = res.data.instructor
        let progress = res.data.progress
        let WatchedVideos = res.data.watchedVideos
        let SolvedExercises = res.data.SolvedExercises
        let yourCourseRating = res.data.yourCourseRating
        let yourCourseReview = res.data.yourCourseReview
        let yourInstructorRating = res.data.yourInstructorRating
        let yourinstructorReview = res.data.yourinstructorReview

        SetCompleted(res.data.completeCourse);
        SetFinalExam(Coursedata.finalExam);
        SetCourseName(Coursedata.title)
        setCourse(Coursedata);
        SetCourseChoosen(Coursedata);
        SetNotes(Notes);
        SetProgress(progress);
        SetWatchedVideos(WatchedVideos);
        SetSolvedExercises(SolvedExercises);
        SetCurrentRatings({
          yourCourseRating: yourCourseRating,
          yourCourseReview: yourCourseReview,
          yourInstructorRating: yourInstructorRating,
          yourinstructorReview: yourinstructorReview
        })
        SetContentChoosen({
          SubtitleID: Coursedata.subtitles[0]._id,
          subttitleName: Coursedata.subtitles[0].header,
          subtitleIndex: 0,
          contentName: Coursedata.subtitles[0].contents[0].description,
          contentIndex: 0,
          ContentID: Coursedata.subtitles[0].contents[0]._id,
          data: { url: Coursedata.subtitles[0].contents[0].video, time: 0 },
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
          SetContentChoosen(
            {
              SubtitleID: Course.subtitles[SubtitleIndex]._id,  //@ts-ignore
              subttitleName: Course.subtitles[SubtitleIndex].header,
              subtitleIndex: SubtitleIndex,
              contentName: Course.subtitles[SubtitleIndex].exercise[0]!.exerciseName,
              contentIndex: ContentIndex + 1,
              ContentID: Course.subtitles[SubtitleIndex].exercise[0]!.exerciseID || "", //@ts-ignore
              data: { name: Course.subtitles[SubtitleIndex].exercise[0].exerciseName || "" },
              isExercise: true

            }
          )
        }
        else {
          if (SubtitleIndex === Course.subtitles.length - 1) {
            return;
          }
          else {
            SetContentChoosen({
              SubtitleID: Course.subtitles[SubtitleIndex + 1]._id,
              subttitleName: Course.subtitles[SubtitleIndex + 1].header,
              subtitleIndex: SubtitleIndex + 1,
              contentName: Course.subtitles[SubtitleIndex + 1].contents[0].description,
              contentIndex: 0,
              ContentID: Course.subtitles[SubtitleIndex + 1].contents[0]._id,
              data: { url: Course.subtitles[SubtitleIndex + 1].contents[0].video, time: 0 },
              isExercise: false
            }
            )
          }
        }
      }
      else {
        SetContentChoosen(
          {
            SubtitleID: ContentChoosen.SubtitleID,
            subttitleName: ContentChoosen.subttitleName,
            subtitleIndex: SubtitleIndex,
            contentName: Course.subtitles[SubtitleIndex].contents[ContentIndex + 1].description,
            contentIndex: ContentIndex + 1,
            ContentID: Course.subtitles[SubtitleIndex].contents[ContentIndex + 1]._id,
            data: { url: Course.subtitles[SubtitleIndex].contents[ContentIndex + 1].video, time: 0 },
            isExercise: false
          }
        )
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
            SetContentChoosen(
              {
                SubtitleID: Course.subtitles[SubtitleIndex - 1]._id,             //@ts-ignore
                subttitleName: Course.subtitles[SubtitleIndex - 1].header,
                subtitleIndex: SubtitleIndex - 1,
                contentName: Course.subtitles[SubtitleIndex - 1].exercise[0]!.exerciseName,
                contentIndex: Course.subtitles[SubtitleIndex - 1].contents.length,
                ContentID: Course.subtitles[SubtitleIndex - 1].exercise[0]!.exerciseID || "", //@ts-ignore
                data: { name: Course.subtitles[SubtitleIndex - 1].exercise[0].exerciseName || "" },
                isExercise: true
              }
            )
          }
          else {
            SetContentChoosen(
              {
                SubtitleID: Course.subtitles[SubtitleIndex - 1]._id,
                subttitleName: Course.subtitles[SubtitleIndex - 1].header,
                subtitleIndex: SubtitleIndex - 1,
                contentName: Course.subtitles[SubtitleIndex - 1].contents[Course.subtitles[SubtitleIndex - 1].contents.length - 1].description,
                contentIndex: Course.subtitles[SubtitleIndex - 1].contents.length - 1,
                ContentID: Course.subtitles[SubtitleIndex - 1].contents[Course.subtitles[SubtitleIndex - 1].contents.length - 1]._id,
                data: { url: Course.subtitles[SubtitleIndex - 1].contents[Course.subtitles[SubtitleIndex - 1].contents.length - 1].video, time: 0 },
                isExercise: false

              })
          }
        }
      }
      else {

        SetContentChoosen(
          {
            SubtitleID: ContentChoosen.SubtitleID,
            subttitleName: ContentChoosen.subttitleName,
            subtitleIndex: SubtitleIndex,
            contentName: Course.subtitles[SubtitleIndex].contents[ContentIndex - 1].description,
            contentIndex: ContentIndex - 1,
            ContentID: Course.subtitles[SubtitleIndex].contents[ContentIndex - 1]._id,
            data: { url: Course.subtitles[SubtitleIndex].contents[ContentIndex - 1].video, time: 0 },
            isExercise: false
          }
        )
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
      <ErrorComp ErrorMessage={Error.Message}></ErrorComp>

    )
  }

  if (Course) {
    return (
      <div className={UserCourseContainer + " " + (CloseSideBar && "overflow-x-hidden")}>
        <WatchContent CourseID={props.id} Next={Next} Prev={Prev} HandleNext={HandleNext} HandlePrev={HandlePrev}></WatchContent>
        <CourseSideBar data={Course.subtitles} SetCloseSideBar={SetCloseSideBar} CloseSideBar={CloseSideBar}></CourseSideBar>
        {CloseSideBar && <div onClick={() => { SetCloseSideBar(false) }} className='absolute bg-navbar border-2 cursor-pointer border-white w-10 h-12 border-r-0  flex items-center justify-center top-20  right-0'>
          <ImArrowLeft2 color='white' size={20}></ImArrowLeft2></div>}
      </div>
    )
  }
}

export default UserCourse

const UserCourseContainer = classNames("flex justify-between items-start relative ");

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let id = context.params?.CourseID;
  if (!id) {
    return {
      props: {
        id: ''
      }
    }
  }
  const decryptId = (str: string) => {
    const decodedStr = decodeURIComponent(str);
    return AES.decrypt(decodedStr, 'secretPassphrase').toString(enc.Utf8);
  }
  const decryptedId = decryptId(typeof id === 'string' ? id : "");
  return {
    props: {
      id: decryptedId
    }


  }


}
