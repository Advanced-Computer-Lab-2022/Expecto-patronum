import classNames from 'classnames'
import React from 'react'
import BigRating from '../../shared/rating/BigRating'

type Props = {}

const OverView = (props: Props) => {
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
          <BigRating Rate={0} RateAction={true}></BigRating>
        </div>
        <div className={RateContainer}>
          <h1>Rate Instructor</h1>
          <BigRating Rate={0} RateAction={true}></BigRating>
        </div>

      </div>
    </div>
  )
}

export default OverView

const OverViewContainer = classNames("flex justify-between items-center px-10");
const TextContainer = classNames("w-2/3 ");
const TextHeader = classNames("text-2xl font-bold mb-2");
const TextBody = classNames("text-lg");
const RateContainer = classNames("text-center p-2");