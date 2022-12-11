import Link from 'next/link';
import React, { useContext } from 'react';
import DataContext from '../../../context/DataContext';
import OneStar from '../../shared/rating/OneStar';
import { TbDiscount2 } from 'react-icons/tb';
import classNames from 'classnames';

type Props = {
    course: any,
    color: any,
    isViewList: any,
}

const InstructorCourseCard = (props: Props) => {

    const { Rate } = useContext(DataContext);
    const saleRibbon = classNames(`after:content-[""] after:rounded-br-md after:absolute ${!props.isViewList ? 'after:-top-1.5 before:-top-2.5 after:w-26': 'sb-max:after:-top-1.5 sb-max:before:-top-2.5 sb:after:-top-1.5 sb:before:-top-2.5 after:w-32'} after:-right-4 before:-right-4 after:z-behind after:bg-canadian-red after:border-l-white after:border-l-[20px] after:border-t-transparent after:border-t-[20px] after:border-b-transparent after:border-b-[20px] before:absolute before:border-l-[5px] before:border-l-red-800 before:border-t-[5px] before:border-t-transparent`);

  return (
    <div className={`${!props.isViewList ? 'flex-col': 'sb-max:flex-col'} flex relative bg-white mb-10 rounded-xl shadow-md hover:shadow-lg transition-all duration-200`}>
        <div className={`${props.color} ${!props.isViewList ? 'w-full rounded-t-xl px-3': 'sb-max:w-full sb-max:rounded-t-xl sb-max:px-3 w-52 min-w-[13rem] sb:rounded-l-xl pl-8 pr-4'} bg-gradient-to-br text-white py-3 h-auto flex flex-col`}>
            <p className='opacity-70 mt-auto'>COURSE SUBJECT</p>
            <p className={`text-2xl my-2 pl-2 -indent-2 ${!props.isViewList ? 'line-clamp-1' : 'sb-max:line-clamp-1'}`}>{props.course.subject}</p>
            <p className='opacity-70 mb-auto'>{parseInt(props.course.courseHours)} HOURS</p>
        </div>
        <div className={`${!props.isViewList ? 'mb-10': 'sb-max:mb-10 mb-10'} px-8 flex w-full min-w-0 justify-between h-full`}>
            <div className='py-4 space-y-2 min-w-0'>
                <div className={`${!props.isViewList ? '': 'sb:mr-22'} mt-3`}>
                    <p className='opacity-50'>TITLE</p>
                    <h1 className='text-2xl'>{props.course.title}</h1>
                </div>
                <p>Level: <span className='italic'>{props.course.level === 'AllLevels' ? 'All Levels': props.course.level}</span></p>
                <p className={`${!props.isViewList ? '' : 'sb:mr-32'} overflow-hidden whitespace-nowrap text-ellipsis`}>{props.course.summary}</p>
            </div>
        </div>
        <a className='whitespace-nowrap absolute bottom-5 right-5 rounded-full bg-input text-white shadow-md hover:shadow-lg border-1.5 border-input hover:bg-white hover:text-input transition-all duration-300 px-2 py-0.5'>Open Course</a>
        {/* <label className={`${!props.isViewList ? 'top-34 right-4': 'sb-max:top-34 sb-max:right-4 sb:right-[5.75rem]'} ${parseInt(props.course.discount?.discount) === 0 ? 'text-[#038470] bg-[#D7FFE0] top-2': 'line-through text-gray-400 scale-90 sb:top-7'} whitespace-nowrap absolute text-sm font-bold px-2 py-0.5 rounded-full`}>{(Math.floor(props.course.price * Rate.rate) - 0.01).toLocaleString()} {Rate.curr}</label> */}
        <label className={`${!props.isViewList ? `top-34 ${parseInt(props.course.discount?.discount) === 0 ? 'right-4': 'left-3'}`: `sb-max:top-34 ${parseInt(props.course.discount?.discount) === 0 ? 'right-4': 'sb-max:left-3'} sb:top-1.5 sb:right-24`} whitespace-nowrap absolute text-sm font-bold text-[#038470] bg-[#D7FFE0] px-2 py-0.5 rounded-full`}><span className={`${parseInt(props.course.discount?.discount) === 0 ? '': 'text-xs line-through text-gray-500'}`}>{(Math.floor(props.course.price * Rate.rate) - 0.01).toLocaleString()}</span> <span className={`${parseInt(props.course.discount?.discount) === 0 ? 'hidden': ''}`}>{(Math.floor(props.course.discountPrice * Rate.rate) - 0.01).toLocaleString()}</span> {Rate.curr}</label>
        <label className={`${!props.isViewList ? 'top-36': 'sb-max:top-36 sb:top-[3.9rem]'} bg-canadian-red right-3 text-white absolute px-1 py-0.5 rounded-full z-10 ${parseInt(props.course.discount?.discount) === 0 ? 'hidden': saleRibbon}`}><span className={`${!props.isViewList ? 'left-4': 'sb-max:left-4'} relative`}>SAVE {props.course.discount?.discount}%</span></label>
        <a href='/Instructor/Settings/AddDiscount/' title='Add Promotion' className={`${(!props.isViewList ? 'bottom-5 left-4': 'sb:bottom-5 sb:right-38 sb-max:bottom-5 sb-max:left-4')} whitespace-nowrap absolute rounded-full text-input bg-white shadow-md hover:shadow-lg border-1.5 border-input hover:text-white hover:bg-input transition-all duration-300 px-2 py-0.5`}>Add Discount</a>
        <OneStar className='bg-white rounded-tr-xl rounded-bl-xl absolute top-0 right-0 py-2 px-3 shadow-md hover:shadow-sm transition-all duration-200' rating={props.course.rating === undefined ? 3.8: props.course.rating.avg} />
    </div>
  )
}

export default InstructorCourseCard;