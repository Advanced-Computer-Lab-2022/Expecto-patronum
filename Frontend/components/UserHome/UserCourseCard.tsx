import classNames from 'classnames'
import Image from 'next/image';
import React from 'react'
import { UserCourseDataInterface } from '../../Interface/UserCourseDataInterface';
import ProgressBar from '../shared/progress/ProgressBar';

type Props = {
  course:UserCourseDataInterface
}

const UserCourseCard = (props: Props) => {
  let [Progress,SetProgress]=React.useState(10);

  return (
    <div className={MyCourseCard}>
    <div className={ImageColorBox}>
    <div className={ImageContainer}>
        <Image
            src="https://i.ibb.co/kqgnCrP/Brush.png"
            width={45}
            height={45}
            alt={"CGP"}
            objectFit="contain"
            layout="responsive"
            priority
          />
        </div>
    </div>
    <div className={TextBox}>
    <p className={CardTitle}>{props.course.title}</p>
      <p className='text-md'>{props.course.instructorName}</p>
      <p className={CardDescription}> {props.course.summary}</p>
    </div>
    <div className={Progress==0?ProgressContainerZero:ProgressContainer}>
      {Progress==0?<p className={StartCourse}>Start Course</p>
      :(<div>
        <p className='font-bold'>{Progress +"%"} complete</p>
      <ProgressBar progressData={Progress}></ProgressBar>
      </div> )}

          {/* <BigRating Rate={Rate} Setter={setRate} RateAction={true}></BigRating> */}
    </div>

    {/* <div>
      <p className={CardTitle}>Title</p>
      <p className='text-md'>instructor</p>
      <p className={CardDescription}>Description</p>
    </div>
      {
      Progress==0?
      <div className={FlexCenter}><p className={StartCourse}>Start Course</p></div>
      
      : 
      <div className='flex justify-between items-center'> 
         <ProgressBar progressData={Progress}></ProgressBar>
         <p>{Progress +"%"} complete</p>
          <BigRating Rate={Rate} Setter={setRate} RateAction={true}></BigRating>
        </div>
      } */}
  


  </div>
  )
}

const MyCourseCard= classNames(`ml-auto mr-auto w-[80%] flex p-2 shadow-md gap-8 items-center mb-10 rounded-xl bg-white cursor-pointer
  hover:shadow-lg transition duration-300 ease-in-out`)

const ImageColorBox= classNames(`px-2 bg-All rounded-xl  `)
const ImageContainer=classNames(`w-32`)

const TextBox=classNames('border-r-2 w-2/4')
const CardTitle= classNames("text-xl font-bold line-clamp-1 w-4/5")
const CardDescription= classNames("text-md line-clamp-2 w-4/5 mt-2")


const StartCourse=classNames("font-bold")
const ProgressContainer=classNames("px-4  w-1/4")
const ProgressContainerZero=classNames("w-1/4 flex justify-center ")

export default UserCourseCard