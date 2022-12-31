import React, { useEffect } from 'react'
import Modal from '../../shared/Modal/Modal'
import OneStar from '../../shared/rating/OneStar'
import RateSection from '../rate/RateSection'
import ReviewSection from './ReviewSection'

import { BsDot } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import classNames from 'classnames'
import axios from 'axios'

import { ApiUrl } from '../../../constants/constants'
import MainButton from '../../shared/button/MainButton'
import Spinner from '../../shared/spinner/Spinner'
import ErrorComp from '../../shared/Error/ErrorComp'


type Props = {
  SetOpen: Function
  RatingData: { one: number, two: number, three: number, four: number, five: number, avg: number }
}

const CourseReviewModal = (props: Props) => {
  const [Page, SetPage] = React.useState(0)
  const [FilterPage, SetFilterPage] = React.useState(0)
  const [Reviews, SetReviews] = React.useState<{
    username: string,
    reviewBody: string,
    rating: number
  }[]>([])
  const [ReviewsLength, SetReviewsLength] = React.useState(0)
  const [Loading, SetLoading] = React.useState(false)
  const [CurrentRate, SetCurrentRate] = React.useState(0)
  const [Error, SetError] = React.useState({ Message: "", hasError: false });

  const [FilteredReviews, SetFilteredReviews] = React.useState<{ username: string, reviewBody: string, rating: number }[]>([])
  useEffect(() => {
    async function fetchData() {
      SetLoading(true)
      try {
        if (CurrentRate === 0) {
          const res = await axios.put(
            `${ApiUrl}/Courses/userViewCourseRatings?page=${Page}`,
            { courseID: "63a59c15e3b96b22a1dc828a" }
          )

          SetReviews((prev) => { return [...prev, ...res.data] })
          SetLoading(false);
          SetReviewsLength(res.data.length)

        }
        else {
          const res = await axios.put(
            `${ApiUrl}/Courses/userfilterByRatings?page=${FilterPage}`,
            { courseID: "63a59c15e3b96b22a1dc828a", rating: (6 - CurrentRate) }
          )
          SetFilteredReviews((prev) => { return [...prev, ...res.data] })
          SetLoading(false);

          SetReviewsLength(res.data.length)

        }
      } catch (error) {
        SetError({ Message: error + "", hasError: true })
      }


    }
    fetchData();

  }, [Page])

  useEffect(() => {
    async function Fetch() {
      try {
        SetLoading(true)
        const res = await axios.put(`${ApiUrl}/Courses/userfilterByRatings?page=${FilterPage}`,
          { courseID: "63a59c15e3b96b22a1dc828a", rating: (6 - CurrentRate) }
        )
        SetFilteredReviews(res.data);
        SetLoading(false);

      }
      catch (error) {
        SetError({ Message: error + "", hasError: true })
      }
    }
    if (CurrentRate !== 0) {
      Fetch();
    }

  }, [CurrentRate])

  function HandleClick() {
    if (CurrentRate === 0) {
      SetPage((prev) => { return prev + 1 })
    }
    else {
      SetFilterPage((prev) => { return prev + 1 })
    }
  }

  if (Error.hasError) {
    return (
      <ErrorComp ErrorMessage={Error.Message}></ErrorComp>

    )
  }

  return (
    <Modal SetOpen={props.SetOpen}>
      <div className="bg-white rounded-lg  w-[80vw] overflow-scroll h-[100vh] pl-10 mt-20 py-5  ">
        <div className='flex justify-between pr-10'>
          <div className={TitleContainer} >
            <div className={RateContainer} >
              <OneStar size='md' rating={props.RatingData.avg} />
              <p className='text-2xl font-semibold'>Course Rating</p>
            </div>
            <div className={RateContainer}>
              <BsDot />
              <p className='text-xl font-semibold'>1300 Rate</p>
            </div>
          </div>
          <AiOutlineClose className=" cursor-pointer" onClick={() => props.SetOpen(false)} fontSize={30}></AiOutlineClose>

        </div>
        <div className='flex gap-[5rem]'>
          <RateSection SetCurrentRate={SetCurrentRate} CurrentRate={CurrentRate} RatingData={props.RatingData}></RateSection>
          {Loading ? <Spinner></Spinner> : <ReviewSection ViewMore={true} review={CurrentRate === 0 ? Reviews : FilteredReviews}></ReviewSection>
          }
        </div>
        <div className='w-full flex justify-end pt-10 pb-40 pr-40'>
          {ReviewsLength >= 9 &&
            <MainButton btnText="View More Reviews" Size="lg" HandleClick={HandleClick} ></MainButton>
          }

        </div>
      </div>

    </Modal >


  )
}


export default CourseReviewModal
const TitleContainer = classNames("flex gap-2 items-center mb-5")
const RateContainer = classNames("flex gap-4 items-center")
