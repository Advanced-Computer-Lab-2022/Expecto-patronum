import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { AddNewCourseContext } from '../../../../pages/Instructor/AddNewCourse';

type Props = {}

const CourseIcon = React.forwardRef((props: Props, ref) => {

  const { setCourseIcon, courseIcon } = useContext(AddNewCourseContext);
  const [prevIcon, setPrevIcon] = useState<any>(undefined);

  const selectIcon = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    setCourseIcon(e.currentTarget.src.split('/').slice(3).join('/'));
    if(prevIcon === e.target) {
      e.currentTarget.classList.toggle('bg-[#444444]');
      return;
    } 
    
    if(prevIcon != undefined) {
      prevIcon.classList.remove('bg-[#444444]');
    }
    e.currentTarget.classList.add('bg-[#444444]');

    setPrevIcon(e.target);
  }

  useEffect(() => {
    console.log(prevIcon);
  }, [courseIcon])

  return (
    <div ref={ref as any} className='hidden w-full'>
      <h1 className='text-center text-3xl py-4 text-black'>Choose Course Icon</h1>
      <div className='row pt-3 sb:pl-10 sb-max:pl-4 sb-max:pr-3 overflow-y-scroll h-[22rem] sb-max:h-700 border-2 rounded-lg course-icon'>
        <div className='col-4 col-lg-2'>
          <img onClick={selectIcon} className={icon} src='/images/Brush.png' />
          <img onClick={selectIcon} className={icon} src='/images/Brush.png' />
          <img onClick={selectIcon} className={icon} src='/images/Brush.png' />
          <img onClick={selectIcon} className={icon} src='/images/Brush.png' />
        </div>
        <div className='col-4 col-lg-2'>
          <img onClick={selectIcon} className={icon} src='/images/Rocket3.png' />
          <img onClick={selectIcon} className={icon} src='/images/Rocket3.png' />
          <img onClick={selectIcon} className={icon} src='/images/Rocket3.png' />
          <img onClick={selectIcon} className={icon} src='/images/Rocket3.png' />
        </div>
        <div className='col-4 col-lg-2'>
          <img onClick={selectIcon} className={icon} src='/images/Trophy.png' />
          <img onClick={selectIcon} className={icon} src='/images/Trophy.png' />
          <img onClick={selectIcon} className={icon} src='/images/Trophy.png' />
          <img onClick={selectIcon} className={icon} src='/images/Trophy.png' />
        </div>
        <div className='col-4 col-lg-2'>
          <img onClick={selectIcon} className={icon} src='/images/pc.png' />
          <img onClick={selectIcon} className={icon} src='/images/pc.png' />
          <img onClick={selectIcon} className={icon} src='/images/pc.png' />
          <img onClick={selectIcon} className={icon} src='/images/pc.png' />
        </div>
        <div className='col-4 col-lg-2'>
          <img onClick={selectIcon} className={icon} src='/images/Brush.png' />
          <img onClick={selectIcon} className={icon} src='/images/Brush.png' />
          <img onClick={selectIcon} className={icon} src='/images/Rocket3.png' />
          <img onClick={selectIcon} className={icon} src='/images/Trophy.png' />
        </div>
        <div className='col-4 col-lg-2'>
          <img onClick={selectIcon} className={icon} src='/images/pc.png' />
          <img onClick={selectIcon} className={icon} src='/images/Rocket3.png' />
          <img onClick={selectIcon} className={icon} src='/images/Trophy.png' />
        </div>
      </div>
    </div>
  )
})

const icon = classNames('min-w-[5rem] min-h-[5rem] w-28 h-28 sb-max:w-14 sb-max:h-14 hover:scale-105 mb-3 hover:bg-dark-gray transition-all duration-200 border-1.5 hover:border-0 border-bright-gray shadow-lg rounded-xl cursor-pointer');

export default CourseIcon;