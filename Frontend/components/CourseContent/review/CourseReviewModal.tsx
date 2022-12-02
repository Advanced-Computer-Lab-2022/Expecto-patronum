import React from 'react'
import Modal from '../../shared/Modal/Modal'
import OneStar from '../../shared/rating/OneStar'
import RateSection from '../rate/RateSection'
import ReviewSection from './ReviewSection'

import { BsDot } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import classNames from 'classnames'


type Props = {
  SetOpen: Function
}

const CourseReviewModal = (props: Props) => {
  const [ClickedRate, setClickedRate] = React.useState({})
  return (
    <Modal SetOpen={props.SetOpen}>
      <div className="bg-white  w-[80vw] overflow-scroll h-[100vh] pl-10 mt-20 py-5  ">
        <div className='flex justify-between pr-10'>
          <div className={TitleContainer} >
            <div className={RateContainer} >
              <OneStar size='md' rating={4.8} />
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
          <RateSection></RateSection>
          <ReviewSection ViewMore={true} review={[{
            username: "John Doe",
            reviewBody: "aokdoaskd koakdo mda mcxs amd mas amw qdmcs w  aokdoaskd koakdo mda mcxs amd mas amw qdmcs w  ",
            rating: 4.9
          }, {
            username: "John Doe",
            reviewBody: "aokdoaskd koakdo mda mcxs amd mas amw qdmcs w ",
            rating: 4.9
          }, {
            username: "John Doe",
            reviewBody: "aokdoaskd koakdo mda mcxs amd mas amw qdmcs w ",
            rating: 4.9
          }, {
            username: "John Doe",
            reviewBody: "aokdoaskd koakdo mda mcxs amd mas amw qdmcs w ",
            rating: 4.9
          }, {
            username: "John Doe",
            reviewBody: "aokdoaskd koakdo mda mcxs amd mas amw qdmcs w ",
            rating: 4.9
          }, {
            username: "John Doe",
            reviewBody: "aokdoaskd koakdo mda mcxs amd mas amw qdmcs w ",
            rating: 4.9
          }, {
            username: "John Doe",
            reviewBody: "aokdoaskd koakdo mda mcxs amd mas amw qdmcs w ",
            rating: 4.9
          },]}></ReviewSection>
        </div>

      </div>

    </Modal >




  )
}

export default CourseReviewModal
const TitleContainer = classNames("flex gap-2 items-center mb-5")
const RateContainer = classNames("flex gap-4 items-center")
