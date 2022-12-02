import classNames from 'classnames'
import React, { useEffect } from 'react'
import ProgressBar from '../shared/progress/ProgressBar'
import BigRating from '../shared/rating/BigRating'
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
import Image from 'next/image';
import UserCourseCard from './UserCourseCard';
import CompPagination from '../shared/pagination/CompPagination';
import axios from 'axios';
import { UserCourseDataInterface } from '../../Interface/UserCourseDataInterface';
import Spinner from '../shared/spinner/Spinner';
import { useQuery } from 'react-query';

type Props = {}

const MyCourses = (props: Props) => {
  
   
  
const [Loading,SetLoading]=React.useState(true);
const [Courses,SetCourses]=React.useState<UserCourseDataInterface[]>([]);

useEffect(()=>{
  SetLoading(true);
  axios.get('http://localhost:5000/user/ViewMyCourses?userId=637b8d0db9a1824a34fabe74')
  .then(res=>{
    SetCourses(res.data);
    SetLoading(false);
  })
},[])



if(Loading){
  return <Spinner></Spinner>
}


  return (
    <div>
      {Courses.map((course,index)=>{
        return(
          <UserCourseCard key={index} course={course}></UserCourseCard>
        )
      })}
    
      </div>
    
  
  )
}

export default MyCourses

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


