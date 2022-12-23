import classNames from 'classnames'
import React, { useEffect } from 'react'
import DataContext from '../../../context/DataContext'
import { AllCourseDataInterface } from '../../../Interface/PurchasedCourse/AllCourseDataInterface'
import RateModal from '../../shared/RateModal/RateModal'
import BigRating from '../../shared/rating/BigRating'

type Props = {
}

const OverView = (props: Props) => {
  const [RateModalOpenCourse, SetRateModalOpenCourse] = React.useState(false)
  const [RateModalOpenInstructor, SetRateModalOpenInstructor] = React.useState(false)
  const { CourseChoosen, SetCourseChoosen } = React.useContext(DataContext);
  const [CurrentRateCourse, SetCurrentRateCourse] = React.useState(0)
  const [CurrentRateInstructor, SetCurrentRateInstructor] = React.useState(0)
  const [RatedBefore, SetRatedBefore] = React.useState(false)

  useEffect(() => {
    if (CurrentRateCourse !== 0) {
      SetRateModalOpenCourse(true)
    }
  }, [CurrentRateCourse])

  useEffect(() => {
    if (CurrentRateInstructor !== 0) {

      SetRateModalOpenInstructor(true)
    }
  }, [CurrentRateInstructor])

  return (
    <div className={OverViewContainer}>
      <div className={TextContainer}>
        <h1 className={TextHeader}>About this Course</h1>
        <p className={TextBody}>{CourseChoosen.summary}</p>
      </div>
      <div className='border-2'>
        <div className={RateContainer}>
          <h1>Rate Course</h1>
          <BigRating Setter={SetCurrentRateCourse} Rate={CurrentRateCourse} RateAction={true}></BigRating>
        </div>
        <div className={RateContainer}>
          <h1>Rate Instructor</h1>
          <BigRating Setter={SetCurrentRateInstructor} Rate={CurrentRateInstructor} RateAction={true}></BigRating>
        </div>

      </div>
      {RateModalOpenCourse && <RateModal Type="instructor" CurrentRate={CurrentRateCourse} SetCurrentRate={SetCurrentRateCourse} setOpen={SetRateModalOpenCourse}></RateModal>}
      {RateModalOpenInstructor && <RateModal Type="course" CurrentRate={CurrentRateInstructor} SetCurrentRate={SetCurrentRateInstructor} setOpen={SetRateModalOpenInstructor}></RateModal>}
    </div>
  )
}

export default OverView

const OverViewContainer = classNames("flex justify-between pb-96 items-center px-10");
const TextContainer = classNames("w-2/3 ");
const TextHeader = classNames("text-2xl font-bold mb-2");
const TextBody = classNames("text-lg");
const RateContainer = classNames("text-center p-2");