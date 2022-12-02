import Link from 'next/link';
import React, { useContext } from 'react';
import DataContext from '../../../context/DataContext';
import OneStar from '../../shared/rating/OneStar';
import { TbDiscount2 } from 'react-icons/tb';

type Props = {
    course: any,
    color: any,
    isViewList: any,
}

const InstructorCourseCard = (props: Props) => {

    const { Rate } = useContext(DataContext);

  return (
    <div className={`${!props.isViewList ? 'flex-col': 'sb-max:flex-col'} flex relative bg-white mb-10 rounded-xl shadow-md hover:shadow-lg transition-all duration-200`}>
        <div className={`${props.color} ${!props.isViewList ? 'w-full rounded-t-xl px-3': 'sb-max:w-full sb-max:rounded-t-xl sb-max:px-3 w-52 min-w-[13rem] sb:rounded-l-xl pl-8 pr-4'} bg-gradient-to-br text-white py-3 h-auto flex flex-col`}>
            <p className='opacity-70 mt-auto'>COURSE SUBJECT</p>
            <p className='text-2xl my-2 pl-2 -indent-2'>{props.course.subject}</p>
            <p className='opacity-70 mb-auto'>{parseInt(props.course.courseHours)} HOURS</p>
        </div>
        <div className={`${!props.isViewList ? 'mb-10': 'sb-max:mb-10'} px-8 flex w-full min-w-0 justify-between h-full`}>
            <div className='py-4 space-y-2 min-w-0'>
                <div className={`${!props.isViewList ? '': 'sb:mr-22'}`}>
                    <p className='opacity-50'>TITLE</p>
                    <h1 className='text-2xl'>{props.course.title}</h1>
                </div>
                <p>Level: <span className='italic'>{props.course.level === 'AllLevels' ? 'All Levels': props.course.level}</span></p>
                <p className={`${!props.isViewList ? '' : 'sb:mr-32'} overflow-hidden whitespace-nowrap text-ellipsis`}>{props.course.summary}</p>
            </div>
        </div>
        <a className='whitespace-nowrap absolute bottom-5 right-5 rounded-full bg-input text-white shadow-md hover:shadow-lg border-1.5 border-input hover:bg-white hover:text-input transition-all duration-300 px-2 py-0.5'>Open Course</a>
        <label className={`${!props.isViewList ? 'bottom-6 left-5': 'sb-max:bottom-6 sb-max:left-5 sb:top-1.5 sb:right-28'} whitespace-nowrap absolute text-sm font-bold text-[#038470] bg-[#D7FFE0] px-2 py-0.5 rounded-full`}>{Math.floor(props.course.price * Rate.rate).toLocaleString()} {Rate.curr}</label>
        <a href='/Instructor/Settings/AddDiscount/' title='Add Promotion' className={`${(!props.isViewList ? 'bottom-5 left-4': 'sb:bottom-5 sb:right-5')} whitespace-nowrap absolute rounded-full text-input bg-white shadow-md hover:shadow-lg border-1.5 border-input hover:text-white hover:bg-input transition-all duration-300 px-2 py-0.5`}>Add Discount</a>
        <OneStar className='bg-white rounded-tr-xl rounded-bl-xl absolute top-0 right-0 py-2 px-3 shadow-md hover:shadow-sm transition-all duration-200' rating={props.course.rating === undefined ? 3.8: props.course.rating.avg} />
    </div>
  )
}

export default InstructorCourseCard;