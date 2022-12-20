import classNames from 'classnames'
import React, { useEffect } from 'react'
import RateModal from '../../shared/RateModal/RateModal'
import BigRating from '../../shared/rating/BigRating'

type Props = {}

const OverView = (props: Props) => {
  const [RateModalOpenCourse, SetRateModalOpenCourse] = React.useState(false)
  const [RateModalOpenInstructor, SetRateModalOpenInstructor] = React.useState(false)

  const [CurrentRateCourse, SetCurrentRateCourse] = React.useState(0)
  const [CurrentRateInstructor, SetCurrentRateInstructor] = React.useState(0)

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
        <h1 className={TextHeader}>Front End Web Development</h1>
        <p className={TextBody}>This course will discuss the fundamentals of digital freelancing by outlining the benefits and disadvantages
          of working for yourself, as well as the main differences between working as a freelancer versus a traditional role.
          In addition to establishing the mindset and skills of a freelancer, this course will teach how to market yourself as a
          freelancer by creating your personal business identity and brand, using social  media in a strategic way to
          find clients and creating a portfolio website targeted towards client acquisition.
        </p>
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
      {RateModalOpenCourse && <RateModal CurrentRate={CurrentRateCourse} SetCurrentRate={SetCurrentRateCourse} setOpen={SetRateModalOpenCourse}></RateModal>}
      {RateModalOpenInstructor && <RateModal CurrentRate={CurrentRateInstructor} SetCurrentRate={SetCurrentRateInstructor} setOpen={SetRateModalOpenInstructor}></RateModal>}
    </div>
  )
}

export default OverView

const OverViewContainer = classNames("flex justify-between items-center px-10");
const TextContainer = classNames("w-2/3 ");
const TextHeader = classNames("text-2xl font-bold mb-2");
const TextBody = classNames("text-lg");
const RateContainer = classNames("text-center p-2");